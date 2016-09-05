import { createSelector } from 'reselect';
import viewBodySelector from './viewBodySelector';
import weeksSelector from './weeksSelector';

const summarySelector = (weeks, tableBody) => {
  if (tableBody.loading || weeks === null) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: weeks
      .map((startOfWeek, index) => (
        {
          week: startOfWeek.format('W'),
          staffed: tableBody.data.employees.reduce((result, employee) =>
            result + employee.weeks.get(index).daysBillable
          , 0),
          staffable: tableBody.data.employees.reduce((result, employee) =>
            result + employee.weeks.get(index).staffable
          , 0)
        }
      )
    )
  };
};

export default createSelector(
  weeksSelector,
  viewBodySelector,
  summarySelector,
);
