import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import staffableSelector from '../selectors/staffableSelector';
import employedWeeksSelector from '../selectors/employedWeeksSelector';
import employeeSelector from './employeeSelector';
import { formatDate } from '../utils/weekUtil';

const getEmployee = (
  weeks,
  workedDaysPerWeek,
  projects,
  staffableMap,
  employee,
  employedWeeks) => {
  if (workedDaysPerWeek.loading
    || projects.loading
    || staffableMap.loading
    || employedWeeks.loading
    || employee.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: workedDaysPerWeek.data
      .reduce((total, value) => total.merge(value.keySeq()), new Immutable.OrderedSet())
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
          staffable: staffableMap.data.get(employee.data.id).get(formatDate(startOfWeek)),
          employedWeek: employedWeeks.data.has(formatDate(startOfWeek))
        }))
      }))
  };
};

export default createSelector(
  weeksSelector,
  state => state.employee_worked_days_per_week,
  state => state.projects,
  staffableSelector,
  employeeSelector,
  employedWeeksSelector,
  getEmployee,
);
