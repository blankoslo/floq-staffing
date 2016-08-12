import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

export const getStaffable = (startOfWeek, startDate, endDate) => {
  if (startDate === undefined || startDate === null) {
    return 0;
  }
  const safeEndDate = endDate === null ? '2099-01-01' : endDate;

  return [0, 1, 2, 3, 4].reduce((total, item) => {
    const date = startOfWeek.clone();
    date.add(item, 'days');
    return total + (date.isBetween(startDate, safeEndDate, 'days', '[]') ? 1 : 0);
  }, 0);
};

const getWeeks = (employee, workedDaysPerWeek, weeks, projectMap) => (
  weeks.map(startOfWeek => {
    const { days, projects } = workedDaysPerWeek.data
      .get(employee.id, new Immutable.Map())
      .get(formatDate(startOfWeek), { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap.data
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    return {
      days,
      unavailable,
      staffable: getStaffable(startOfWeek, employee.date_of_employment, employee.termination_date)
    };
  })
);

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap) => {
  if (employees.loading || workedDaysPerWeek.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      weeks: getWeeks(e, workedDaysPerWeek, weeks, projectMap) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  getEmployees,
);
