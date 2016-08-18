import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import staffableSelector from '../selectors/staffableSelector';
import employedWeeksSelector from '../selectors/employedWeeksSelector';
import { formatDate } from '../utils/weekUtil';

const getWeeks = (weeks, workedDaysPerWeek, staffableMap, employeeId, employedWeeks) => {
  if (workedDaysPerWeek.loading || staffableMap.loading || employedWeeks.loading) {
    return { loading: true, data: null };
  }
  return ({
    loading: false,
    data: weeks.map((startOfWeek) => ({
      startOfWeek,
      sum: workedDaysPerWeek.data
        .get(formatDate(startOfWeek), new Immutable.Map())
        .reduce((total, item) =>
        total + item
        , 0),
      staffable: staffableMap.data.get(employeeId).get(formatDate(startOfWeek)),
      employedWeek: employedWeeks.data.has(employeeId)
    }))
  });
};

export default createSelector(
  weeksSelector,
  state => state.employee_worked_days_per_week,
  staffableSelector,
  state => state.selected_employee,
  employedWeeksSelector,
  getWeeks
);
