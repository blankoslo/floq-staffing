import { createSelector } from 'reselect';
import moment from 'moment';
import * as Immutable from 'immutable';

// TODO: Needs heavy testing.
const getWeeks = (week, year) => {
  let weeks = new Immutable.List();
  const maxWeek = moment().year(year).isoWeeksInYear();
  const start = Math.min(Math.max(week, 1), maxWeek);
  const elements = 8;

  for (let i = start, j = year; weeks.size < elements; i === maxWeek ? (i = 1, j++) : i++) {
    weeks = weeks.push({ week: i, year: j });
  }
  return weeks;
};

export default createSelector(
  state => state.selected_week,
  state => state.selected_year,
  getWeeks
);
