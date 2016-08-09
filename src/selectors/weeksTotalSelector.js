import { createSelector } from 'reselect';
import weeksSelector from '../selectors/weeksSelector';
import employeesSelector from '../selectors/employeesSelector';

const getWeeksTotal = (weeks, workedDaysPerWeek, employees) => {
  if (employees.loading || workedDaysPerWeek.loading) {
    return { loading: true, data: null };
  }
  return weeks.map((week, index) =>
    Object.assign({}, week, {
      sum: workedDaysPerWeek.data.toSetSeq().reduce((result, item) =>
        result + (item.has(week.week) ? item.get(week.week).days : 0), 0),
      staffable: employees.data
        .toIndexedSeq()
        .reduce((result, item) => result + item.weeks.get(index).staffable, 0)
    })
  );
};


export default createSelector(
  weeksSelector,
  state => state.worked_days_per_week,
  employeesSelector,
  getWeeksTotal
);
