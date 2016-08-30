import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from './weeksSelector';
import employeeSelector from './employeeSelector';
import { formatDate } from '../utils/weekUtil';

const wasEmployed = (startOfWeek, startDate, endDate) => {
  if (startDate === undefined || startDate === null) {
    return 0;
  }
  const safeEndDate = endDate === null ? '2099-01-01' : endDate;

  return [0, 1, 2, 3, 4, 5, 6].some(item => {
    const date = startOfWeek.clone();
    date.add(item, 'days');
    return date.isBetween(startDate, safeEndDate, 'days', '[]');
  });
};

export const getEmployedWeeks = (weeks, employee) => {
  if (weeks === null || employee.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: weeks.reduce((set, startOfWeek) =>
      (wasEmployed(startOfWeek, employee.data.date_of_employment, employee.data.termination_date)
        ? set.add(formatDate(startOfWeek)) : set)
      , new Immutable.OrderedSet()
    )
  };
};

export default createSelector(
  weeksSelector,
  employeeSelector,
  getEmployedWeeks
);
