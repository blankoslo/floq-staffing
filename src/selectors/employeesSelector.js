import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import moment from 'moment';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

const getStaffable = (startOfWeek, employee) => {
  const diff = moment(employee.date_of_employment).diff(startOfWeek, 'days');
  if (diff >= 5) return 0;
  if (diff <= 0) return 5;
  // TODO: staffable is 5 minus count(official holy days)
  return 5 - diff;
};

const getWeeks = (employee, workedDaysPerWeek, weeks, projectMap) => (
  weeks.map(startOfWeek => {
    const { days, projects } = workedDaysPerWeek.data
      .get(employee.id, new Immutable.Map())
      .get(formatDate(startOfWeek), { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap.data
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    return {
      days,
      unavailable,
      staffable: getStaffable(startOfWeek, employee)
    };
  })
);

const getEmployees = (employees, workedDaysPerWeek, weeks, projectMap) => {
  if (employees.loading || workedDaysPerWeek.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: employees.data.map(e => ({
      name: `${e.first_name} ${e.last_name}`,
      id: e.id,
      dateOfEmployment: e.date_of_employment,
      terminationDate: e.termination_date,
      weeks: getWeeks(e, workedDaysPerWeek, weeks, projectMap) }))
  };
};

export default createSelector(
  state => state.employees,
  state => state.worked_days_per_week,
  weeksSelector,
  state => state.projects,
  getEmployees,
);
