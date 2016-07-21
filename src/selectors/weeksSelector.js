import { createSelector } from 'reselect';
import moment from 'moment';

// TODO: Needs heavy testing.
const getWeeks = (week, year) => {
  const weeks = [];
  const maxWeek = moment().year(year).isoWeeksInYear();
  const start = Math.min(Math.max(week, 1), maxWeek);
  const elements = 5;

  for (let i = start, j = year; weeks.length < elements; i === maxWeek ? (i = 1, j++) : i++) {
    weeks.push({ week: i, year: j });
  }
  return weeks;
};

export default createSelector(
  state => state.selected_week,
  state => state.selected_year,
  getWeeks
);
