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
    || weekSummariesPerEmployee.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: {
      employees: employees.data.reduce((result, value, key) => (result.push({
        name: `${value.first_name} ${value.last_name}`,
        id: value.id,
        startDate: value.date_of_employment,
        endDate: value.termination_date,
        weeks: weekSummariesPerEmployee.data.get(key),
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
