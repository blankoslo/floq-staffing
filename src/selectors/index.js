import { List, OrderedSet, OrderedMap } from 'immutable';
import { createSelector } from 'reselect';
import dateFns from 'date-fns';
import nbLocale from 'date-fns/locale/nb';

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
  (e, holidays, absence, staffing) =>
    e.map((x) => absence
          .get(x.id, new OrderedMap())
          .mergeWith((a, b) => a.concat(b), holidays)
          .mergeWith((a, b) => a.concat(b), staffing.get(x.id)))
);

export const isAbsence = (event) => {
  switch (event.name) {
    case 'FER1000':
    case 'SYK1001':
    case 'SYK1002':
    case 'PER1000':
    case 'PER1001':
      return true;
    default:
      return !event.project;
  }
};

const getAvailability = (projects, e, weekDays, evts) => {
  const weekDayStrs = weekDays
          .filter((x) =>
                  dateFns.isAfter(x, dateFns.parse(e.date_of_employment)))
          .filter((x) => !e.termination_date ||
                  dateFns.isBefore(x, dateFns.parse(e.termination_date)))
          .map((x) => dateFns.format(x, 'YYYY-MM-DD'));
  const staffedDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some((y) => !isAbsence(y)))
          .count();
  const billableDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some((y) => projects.get(y.name, {}).billable === 'billable'))
          .count();
  const absentDays = weekDayStrs
          .filter((x) => evts.get(x, new List())
                  .some(isAbsence))
          .count();
  const availableDays = weekDayStrs.count() - absentDays;
  return ({
    staffedDays,
    billableDays,
    absentDays,
    availableDays
  });
};

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
  (state) => state.timeline.filter.toLowerCase(),
  (p, filter) => p
    .filter((x) => x.id.toLowercase().includes(filter) ||
            x.name.toLowerCase().includes(filter))
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
                .groupBy((y) => y.project).keySeq()
                .filter((y) => y)
                .toOrderedSet()
            ])
            .map(([k, v]) => [
              k,
              v.union(newProjects.get(k, new OrderedSet()).toList())
            ])
            .filter(([k, v]) => v.count() > 0);
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
  absentDays: 0,
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
