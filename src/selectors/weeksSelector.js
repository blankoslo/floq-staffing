import { createSelector } from 'reselect';
import * as Immutable from 'immutable';

// TODO: Needs heavy testing.
const getWeeks = (selectedStartOfWeek, selectedWeekSpan) =>
  new Immutable.Range(0, selectedWeekSpan).toList()
    .map((index) => {
      const result = selectedStartOfWeek.clone();
      result.add(index * 7, 'days');
      return result;
    });

export default createSelector(
  state => state.selected_start_of_week,
  state => state.selected_week_span,
  getWeeks
);
