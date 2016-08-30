import * as Immutable from 'immutable';
import { createSelector } from 'reselect';
import weeksSelector from '../selectors/weeksSelector';
import employeesSelector from '../selectors/viewBodySelector';
import { formatDate } from '../utils/weekUtil';

const getWeeksTotal = (weeks, employees, weekSpan, startOfWeek) => {
  if (employees.loading) {
    return { loading: true, data: null };
  }
  return ({
    loading: false,
    data: {
      days: new Immutable.Range(0, weekSpan * 7).map(d => {
        const date = startOfWeek.clone();
        date.add(d, 'days');
        return {
          date: formatDate(date),
          dayOfWeek: date.format('ddd')
        };
      }),
      weeks: new Immutable.Range(0, weekSpan).map(d => {
        const date = startOfWeek.clone();
        date.add(d, 'weeks');
        const weeknumber = date.format('W');
        const first = formatDate(date);
        date.add(6, 'days');
        return {
          first,
          last: formatDate(date),
          weeknumber
        };
      }),
      months: new Immutable.Range(0, weekSpan * 7).reduce((result, item) => {
        const date = startOfWeek.clone();
        date.add(item, 'days');
        const month = date.format('MMM');
        if (result.has(month)) {
          return result.set(month, result.get(month) + 1);
        }
        return result.set(month, 1);
      }, new Immutable.OrderedMap())
      .reduce((result, value, key) =>
        result.push({ month: key, colspan: value }), new Immutable.List()),
      years: new Immutable.Range(0, weekSpan * 7).reduce((result, item) => {
        const date = startOfWeek.clone();
        date.add(item, 'days');
        const year = date.format('YYYY');
        if (result.has(year)) {
          return result.set(year, result.get(year) + 1);
        }
        return result.set(year, 1);
      }, new Immutable.OrderedMap())
      .reduce((result, value, key) =>
        result.push({ year: key, colspan: value }), new Immutable.List()),
    }
  });
};

export default createSelector(
  weeksSelector,
  employeesSelector,
  state => state.selected_week_span,
  state => state.selected_start_of_week,
  getWeeksTotal
);
