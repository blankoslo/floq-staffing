import { createSelector } from 'reselect';
import weeksSelector from './weeksSelector';
import weekSummariesPerEmployeeSelector from './weekSummariesPerEmployeeSelector';

const summarySelector = (weeks, weekSummariesPerEmployee) => {
  if (weekSummariesPerEmployee.loading || weeks === null) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: weeks
      .map((startOfWeek, index) => (
        {
          week: startOfWeek.format('W'),
          staffed: weekSummariesPerEmployee.data.reduce((result, weekSummaries) =>
            result + weekSummaries.get(index).daysBillable
          , 0),
          staffable: weekSummariesPerEmployee.data.reduce((result, weekSummaries) =>
            result + weekSummaries.get(index).staffable
          , 0)
        }
      )
    )
  };
};

export default createSelector(
  weeksSelector,
  weekSummariesPerEmployeeSelector,
  summarySelector,
);
