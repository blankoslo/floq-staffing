import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import moment from 'moment';
import weeksSelector from '../selectors/weeksSelector';

const getStaffable = (week, employee) => {
  const firstDate = moment().startOf('isoweek')
    .year(week.year)
    .isoWeek(week.week);

  const diff = moment(employee.date_of_employment).diff(firstDate, 'days');
  // debugger;
  if (diff >= 5) return 0;
  if (diff <= 0) return 5;
  return 5 - diff;
};

const getWeeks = (employee, workedDaysPerWeek, weeks, projectMap) => (
  weeks.map(w => {
    const { days, projects } = workedDaysPerWeek.data
      .get(employee.id, new Immutable.Map())
      .get(w.week, { days: 0, projects: new Immutable.List() });

    const unavailable = projects.reduce((result, item) =>
      result + (projectMap.data
      .get(item)
      .billable === 'unavailable' ? 1 : 0)
    , 0);
    // TODO: staffable is 5 minus count(official holy days)
    return {
      days,
      unavailable,
      staffable: getStaffable(w, employee)
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
