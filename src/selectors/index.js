import { List, OrderedSet, OrderedMap } from 'immutable';
import { createSelector } from 'reselect';
import dateFns from 'date-fns';
import nbLocale from 'date-fns/locale/nb';

export const UNAVAILABLE = 'unavailable';
export const BILLABLE = 'billable';

export const currentDays = createSelector(
  (state) => state.timeline.startDate,
  (state) => state.timeline.endDate,
  (startDate, endDate) =>
    new List(dateFns.eachDay(startDate, endDate)
             .filter((x) => !dateFns.isWeekend(x)))
);

export const currentWeeks = createSelector(
  currentDays,
  (days) =>
    new OrderedMap(days.map(dateFns.getISOWeek)
                   .groupBy((x) => x)
                   .map((x) => x.count() / days.count()))
);

export const currentMonths = createSelector(
  currentDays,
  (days) =>
    new OrderedMap(days.map((x) => dateFns.format(x, 'MMMM YYYY',
                                                  { locale: nbLocale }))
                   .groupBy((x) => x)
                   .map((x) => x.count() / days.count()))
);

const daysByWeek = createSelector(
  currentDays,
  (days) => days.groupBy(dateFns.getISOWeek)
);

export const events = createSelector(
  (state) => state.employees.data || new OrderedMap(),
  (state) => state.holidays.data || new OrderedMap(),
  (state) => state.absence.data || new OrderedMap(),
  (state) => state.staffing.data || new OrderedMap(),
  (state) => state.projects.data || new OrderedMap(),
  (state) => state.absenceReasons.data || new OrderedMap(),
  (e, holidays, absence, staffing, projects, absReasons) => {
    const holidaysWithBillable = holidays.map(days => days.map(day =>
      Object.assign({ billable: UNAVAILABLE }, day)));

    const absenceWithBillable = absence.map(employee => employee.map(days => days.map(day =>
      Object.assign({ billable: absReasons.find((ar) => ar.id === day.reason).billable }, day))));

    const staffingWithBillable = staffing.map(emp => emp.map(days => days.map(day =>
      Object.assign({ billable: projects.get(day.project).billable }, day))));

    const eventsWithBillable = e.map((x) => absenceWithBillable
          .get(x.id, new OrderedMap())
          .mergeWith((a, b) => a.concat(b), holidaysWithBillable)
          .mergeWith((a, b) => a.concat(b), staffingWithBillable.get(x.id)));
    return eventsWithBillable;
  }
);

const getAvailability = (projects, e, weekDays, evts) => {
  const weekDayStrs = weekDays
          .filter((x) =>
                  dateFns.isAfter(x, dateFns.parse(e.date_of_employment)))
          .filter((x) => !e.termination_date ||
                  dateFns.isBefore(x, dateFns.parse(e.termination_date)))
          .map((x) => dateFns.format(x, 'YYYY-MM-DD'));
  const staffedDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some((y) => y.billable !== UNAVAILABLE))
          .count();
  const billableDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some((y) => y.billable === BILLABLE))
          .count();
  const unavailableDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some((y) => y.billable === UNAVAILABLE))
          .count();
  const availableDays = weekDayStrs.count() - unavailableDays;
  return ({
    staffedDays,
    billableDays,
    unavailableDays,
    availableDays
  });
};

export const absenceReasons = createSelector(
  (state) => state.absenceReasons.data || new OrderedMap(),
  (p) => p
);

export const availabilityPerWeek = createSelector(
  (state) => state.employees.data || new OrderedMap(),
  (state) => state.projects.data || new OrderedMap(),
  events,
  daysByWeek,
  (e, projects, evts, weeks) => {
    const availability = evts.entrySeq()
            .map(([k, v]) => ([
              k,
              weeks.map((x) => getAvailability(projects, e.get(k), x, v))
            ]));
    return new OrderedMap(availability);
  }
);

export const employees = createSelector(
  (state) => state.employees.data || new OrderedMap(),
  (state) => state.timeline.filter.toLowerCase(),
  (state) => state.timeline.filterAvailableTime,
  availabilityPerWeek,
  (e, filter, filterAvailableTime, availability) => {
    const filterName = (x) => `${x.first_name} ${x.last_name}`.toLowerCase();
    return e
      .filter((x) => filterName(x).includes(filter))
      .filter((x) => !filterAvailableTime ||
              availability.get(x.id, new OrderedMap())
              .some((y) => y.availableDays > y.staffedDays));
  }
);

export const projects = createSelector(
  (state) => state.projects.data || new OrderedMap(),
  (p) => p
);

export const customers = createSelector(
  (state) => state.projects.data || new OrderedMap(),
  (p) => p.groupBy((x) => x.customer.id)
);

export const projectNames = createSelector(
  (state) => state.projects.data || new OrderedMap(),
  (p) => p.map((x) => `${x.customer.name} - ${x.name}`)
);

export const projectsByEmployee = createSelector(
  events,
  employees,
  (state) => state.staffingTool.newProjects,
  (evts, e, newProjects) => {
    const es = e.keySeq()
            .map((x) => [
              x,
              evts.get(x, new OrderedMap())
                .valueSeq().flatten()
                .groupBy((y) => y.project)
                .keySeq()
                .filter((y) => y)
                .toOrderedSet()
            ])
            .map(([k, v]) => [
              k,
              v.union(newProjects.get(k, new OrderedSet()).toList())
            ])
            .filter((x) => x[1].count() > 0);
    return new OrderedMap(es).mergeDeep(newProjects);
  }
);

export const employeesByProject = createSelector(
  (state) => state.projects.data || new OrderedMap(),
  projectsByEmployee,
  employees,
  (p, pbe, e) => {
    const ps = p.keySeq()
            .map((x) => ([
              x,
              pbe
                .filter((v, k) => e.keySeq().includes(k))
                .filter((v) => v.includes(x)).keySeq()
            ]));
    return new OrderedMap(ps).filter((x) => x.count() > 0);
  }
);

const getStaffing = (project, weekDays, evts) => weekDays
  .map((x) => dateFns.format(x, 'YYYY-MM-DD'))
  .filter((x) => evts.get(x, new List())
                     .some((y) => y.name === project))
  .count();

export const staffingPerWeek = createSelector(
  projectsByEmployee,
  (state) => state.staffing.data || new OrderedMap(),
  daysByWeek,
  (pbe, staffing, weeks) => {
    const staffingMap = pbe
            .map((v, k) => new OrderedMap(v.map((x) => ([
              x,
              weeks.map((y) => getStaffing(x, y, staffing.get(k, new OrderedMap())))
            ]))));
    return new OrderedMap(staffingMap);
  }
);

const defaultAvailability = {
  availableDays: 0,
  staffedDays: 0,
  unavailableDays: 0,
  billableDays: 0
};

export const summaryPerWeek = createSelector(
  currentWeeks,
  availabilityPerWeek,
  (weeks, apw) =>
    weeks.map((x, k) => apw
              .valueSeq()
              .reduce((s, y) => ({
                totalAvailableDays: s.totalAvailableDays
                  + y.get(k, defaultAvailability).availableDays,
                totalStaffedDays: s.totalStaffedDays
                  + y.get(k, defaultAvailability).staffedDays,
                totalBillableDays: s.totalBillableDays
                  + y.get(k, defaultAvailability).billableDays
              }), {
                totalAvailableDays: 0,
                totalStaffedDays: 0,
                totalBillableDays: 0
              }))
);
