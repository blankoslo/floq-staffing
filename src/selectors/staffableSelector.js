import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

export const perEmployeePerWeek =
  (startOfWeek, startDate, endDate, holidays = new Immutable.Set()) => {
    if (startDate === undefined || startDate === null) {
      return 0;
    }
    const safeEndDate = endDate === null ? '2099-01-01' : endDate;

    return [0, 1, 2, 3, 4].reduce((total, item) => {
      const date = startOfWeek.clone();
      date.add(item, 'days');
      if (holidays.has(formatDate(date))) {
        return total;
      }
      return total + (date.isBetween(startDate, safeEndDate, 'days', '[]') ? 1 : 0);
    }, 0);
  };

const perEmployee = (weeks, employee, holidays) =>
  weeks.reduce((map, startOfWeek) =>
    map.set(
      formatDate(startOfWeek),
      perEmployeePerWeek(
        startOfWeek,
        employee.date_of_employment,
        employee.termination_date,
        holidays)
    )
    , new Immutable.OrderedMap());

const getStaffableMap = (weeks, employees, holidays) => {
  if (employees.loading || holidays.loading) {
    return { loading: true, data: new Immutable.Map() };
  }
  return {
    loading: false,
    data: employees.data.reduce(
      (map, employee) => map.set(employee.id, perEmployee(weeks, employee, holidays.data))
      , new Immutable.OrderedMap()
    )
  };
};

export default createSelector(
  weeksSelector,
  state => state.employees,
  state => state.holidays,
  getStaffableMap
);
