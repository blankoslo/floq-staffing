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

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap,
  staffableMap, selectedEmployee, selectedStartOfWeek) => {
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
      selectedEmployee: selectedEmployee === 'undefined' ? null : selectedEmployee,
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
  state => state.selected_employee,
  state => state.selected_start_of_week,
  getEmployees,
);
