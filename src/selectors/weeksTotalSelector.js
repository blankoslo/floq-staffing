import { createSelector } from 'reselect';
import weeksSelector from '../selectors/weeksSelector';

const getWeeksTotal = (weeks, workedDaysPerWeek, employees) =>
  weeks.map(week =>
    Object.assign({}, week, {
      sum: workedDaysPerWeek.data.toSetSeq().reduce((result, item) =>
        result + (item.has(week.week) ? item.get(week.week) : 0), 0),
      available: employees.data.size * 5
    }));


export default createSelector(
  weeksSelector,
  state => state.worked_days_per_week,
  state => state.employees,
  getWeeksTotal
);
