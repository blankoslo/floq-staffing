import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';
import staffableSelector from './staffableSelector';
import employeeSelector from './employeeSelector';

const getWeeks = (employeeId, workedDaysPerWeek, weeks, projectMap, staffableMap) => (
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

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap,
  staffableMap, employee, selectedStartOfWeek) => {
  if (employees.loading
    || workedDaysPerWeek.loading
    || projectMap.loading
    || staffableMap.loading
    || selectedStartOfWeek === null
    || selectedStartOfWeek === 'undefined') {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: {
      employees: employees.data.reduce((result, e) => (result.push({
        name: `${e.first_name} ${e.last_name}`,
        id: e.id,
        startDate: e.date_of_employment,
        endDate: (e.termination_date !== 'undefined' && e.termination_date !== null
          ? e.termination_date : null),
        weeks: getWeeks(e.id, workedDaysPerWeek.data, weeks, projectMap.data, staffableMap.data),
      })), new Immutable.List()),
      selectedEmployee: employee.data,
      selectedStartOfWeek: formatDate(selectedStartOfWeek),
    }
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  staffableSelector,
  employeeSelector,
  state => state.selected_start_of_week,
  getEmployees,
);
