import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';
import staffableSelector from './staffableSelector';

const getWeekSummaries = (employeeId, workedDaysPerWeek, weeks, projectMap, staffableMap) => (
  weeks.map(startOfWeek => {
    const { days, projects } = workedDaysPerWeek
      .get(employeeId, new Immutable.Map())
      .get(formatDate(startOfWeek), { days: 0, projects: new Immutable.Map() });
    const unavailable = projects.reduce((result, amount, project) =>
      result + (projectMap
      .get(project)
      .billable === 'unavailable' ? amount : 0)
    , 0);
    const daysBillable = projects.reduce((result, amount, project) =>
      result + (projectMap
      .get(project)
      .billable === 'billable' ? amount : 0)
    , 0);
    return {
      days: days - unavailable,
      daysBillable,
      staffable: staffableMap.get(employeeId).get(formatDate(startOfWeek)) - unavailable
    };
  })
);

const getWeekSummariesPerEmployeeSelector =
  (employees, workedDaysPerWeek, projectMap, weeks, staffableMap) => {
    if (employees.loading
        || workedDaysPerWeek.loading
        || projectMap.loading
        || staffableMap.loading) {
      return { loading: true, data: null };
    }
    return {
      loading: false,
      data: employees.data.reduce((result, e) =>
        (result.set(e.id, getWeekSummaries(e.id, workedDaysPerWeek.data,
          weeks, projectMap.data, staffableMap.data))
      ), new Immutable.Map())
    };
  };

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  state => state.projects,
  weeksSelector,
  staffableSelector,
  getWeekSummariesPerEmployeeSelector,
);
