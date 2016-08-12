import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

export const getStaffable = (startOfWeek, startDate, endDate, holidays = new Immutable.Set()) => {
  if (startDate === undefined || startDate === null) {
    return 0;
  }
  const safeEndDate = endDate === null ? '2099-01-01' : endDate;

  return [0, 1, 2, 3, 4].reduce((total, item) => {
    const date = startOfWeek.clone();
    date.add(item, 'days');
    if (holidays.has(formatDate(date))) {
      return total;
    }
    return total + (date.isBetween(startDate, safeEndDate, 'days', '[]') ? 1 : 0);
  }, 0);
};

const getWeeks = (employee, workedDaysPerWeek, weeks, projectMap, holidays) => (
  weeks.map(startOfWeek => {
    const { days, projects } = workedDaysPerWeek
      .get(employee.id, new Immutable.Map())
      .get(formatDate(startOfWeek), { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    return {
      days,
      unavailable,
      staffable: getStaffable(
        startOfWeek,
        employee.date_of_employment,
        employee.termination_date,
        holidays)
    };
  })
);

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap, holidays) => {
  if (employees.loading || workedDaysPerWeek.loading || holidays.loading || projectMap.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      weeks: getWeeks(e, workedDaysPerWeek.data, weeks, projectMap.data, holidays.data) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  state => state.holidays,
  getEmployees,
);
