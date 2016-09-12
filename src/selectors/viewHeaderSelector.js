import * as Immutable from 'immutable';
import { createSelector } from 'reselect';
import { formatDate } from '../utils/weekUtil';

const getDays = (weekSpan, startOfWeek, holidays) =>
  new Immutable.Range(0, weekSpan * 7).map(d => {
    const date = startOfWeek.clone();
    date.add(d, 'days');
    const day = date.format('ddd');
    return {
      date: formatDate(date),
      dayOfWeek: day,
      weekend: day === 'Sat' || day === 'Sun',
      holiday: holidays.reduce((name, x) =>
        (x.date === formatDate(date) ? x.name : name), '')
    };
  });

const getWeeks = (weekSpan, startOfWeek) =>
  new Immutable.Range(0, weekSpan).map(d => {
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
  });

const getMonths = (weekSpan, startOfWeek) =>
  new Immutable.Range(0, weekSpan * 7).reduce((result, item) => {
    const date = startOfWeek.clone();
    date.add(item, 'days');
    const month = date.format('MMM');
    if (result.has(month)) {
      return result.set(month, result.get(month) + 1);
    }
    return result.set(month, 1);
  }, new Immutable.OrderedMap())
  .reduce((result, value, key) =>
    result.push({ month: key, colspan: value }), new Immutable.List());

const getYears = (weekSpan, startOfWeek) =>
  new Immutable.Range(0, weekSpan * 7).reduce((result, item) => {
    const date = startOfWeek.clone();
    date.add(item, 'days');
    const year = date.format('YYYY');
    if (result.has(year)) {
      return result.set(year, result.get(year) + 1);
    }
    return result.set(year, 1);
  }, new Immutable.OrderedMap())
  .reduce((result, value, key) =>
    result.push({ year: key, colspan: value }), new Immutable.List());

const getViewHeaderData = (weekSpan, startOfWeek, holidays) => {
  if (weekSpan === null || startOfWeek === null || holidays.loading) {
    return { loading: true, data: null };
  }
  return ({
    loading: false,
    data: {
      days: getDays(weekSpan, startOfWeek, holidays.data),
      weeks: getWeeks(weekSpan, startOfWeek),
      months: getMonths(weekSpan, startOfWeek),
      years: getYears(weekSpan, startOfWeek),
    }
  });
};

export default createSelector(
  state => state.selected_week_span,
  state => state.selected_start_of_week,
  state => state.holidays,
  getViewHeaderData
);
