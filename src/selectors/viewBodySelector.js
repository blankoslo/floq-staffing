import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';
import staffableSelector from './staffableSelector';
import employeeSelector from './employeeSelector';
import weekSummariesPerEmployeeSelector from './weekSummariesPerEmployeeSelector';

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap,
  staffableMap, selectedStartOfWeek, weekSummariesPerEmployee, employee) => {
  if (employees.loading
    || workedDaysPerWeek.loading
    || projectMap.loading
    || staffableMap.loading
    || selectedStartOfWeek === null
    || selectedStartOfWeek === 'undefined'
    || weekSummariesPerEmployee.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: {
      employees: employees.data.reduce((result, e, index) => (result.push({
        name: `${e.first_name} ${e.last_name}`,
        id: e.id,
        startDate: e.date_of_employment,
        endDate: (e.termination_date !== 'undefined' && e.termination_date !== null
          ? e.termination_date : null),
        weeks: weekSummariesPerEmployee.data.get(index),
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
  state => state.selected_start_of_week,
  weekSummariesPerEmployeeSelector,
  employeeSelector,
  getEmployees,
);
