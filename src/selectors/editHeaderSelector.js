import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

const getWeeks = (weeks, workedDaysPerWeek) => {
  if (workedDaysPerWeek.loading) {
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
        , 0)
    }))
  });
};

export default createSelector(
  weeksSelector,
  state => state.employee_worked_days_per_week,
  getWeeks
);
