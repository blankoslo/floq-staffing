import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';
import staffableSelector from './staffableSelector';

const getWeeks = (employeeId, workedDaysPerWeek, weeks, projectMap, staffableMap) => (
  weeks.map(startOfWeek => {
    const { days, projects } = workedDaysPerWeek
      .get(employeeId, new Immutable.Map())
      .get(formatDate(startOfWeek), { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    return {
      days,
      unavailable,
      staffable: staffableMap.get(employeeId).get(formatDate(startOfWeek))
    };
  })
);

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap, staffableMap) => {
  if (employees.loading
    || workedDaysPerWeek.loading
    || projectMap.loading
    || staffableMap.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      weeks: getWeeks(e.id, workedDaysPerWeek.data, weeks, projectMap.data, staffableMap.data) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  staffableSelector,
  getEmployees,
);
