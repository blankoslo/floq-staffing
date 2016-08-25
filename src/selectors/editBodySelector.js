import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import staffableSelector from '../selectors/staffableSelector';
import employedWeeksSelector from '../selectors/employedWeeksSelector';
import { formatDate } from '../utils/weekUtil';

const getEmployee = (
  weeks,
  workedDaysPerWeek,
  projects,
  staffableMap,
  employeeId,
  employedWeeks,
  selected) => {
  if (workedDaysPerWeek.loading
    || projects.loading
    || staffableMap.loading
    || employedWeeks.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: workedDaysPerWeek.data
      .toIndexedSeq()
      .reduce((total, item) => total.merge(item.keySeq()), new Immutable.List())
      .map(id => ({
        id,
        name: projects.data.get(id).name,
        weeks: weeks.map(startOfWeek => ({
          start: startOfWeek,
          days: workedDaysPerWeek.data
            .get(formatDate(startOfWeek), new Immutable.Map()).get(id, 0),
          sum: workedDaysPerWeek.data
            .get(formatDate(startOfWeek), new Immutable.Map())
            .reduce((total, item) =>
            total + item
            , 0),
          staffable: staffableMap.data.get(employeeId).get(formatDate(startOfWeek)),
          employedWeek: employedWeeks.data.has(formatDate(startOfWeek)),
          selected: selected !== null &&
            selected.project === id &&
            selected.startOfWeek === formatDate(startOfWeek)
        }))
      }))
  };
};

export default createSelector(
  weeksSelector,
  state => state.employee_worked_days_per_week,
  state => state.projects,
  staffableSelector,
  state => state.selected_employee,
  employedWeeksSelector,
  state => state.selected_cell,
  getEmployee,
);
