import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';

const getWeeks = (employeeId, workedDaysPerWeek, weeks) => (
  weeks.map(w => workedDaysPerWeek.data.get(employeeId, new Immutable.Map()).get(w.week, 0))
);

const getEmployees = (employees, workedDaysPerWeek, weeks) => {
  if (employees.loading || workedDaysPerWeek.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      weeks: getWeeks(e.id, workedDaysPerWeek, weeks) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  getEmployees,
);
