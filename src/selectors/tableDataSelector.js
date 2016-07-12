import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import moment from 'moment';

// TODO: Needs heavy testing.
const showWeeks = (week, year) => {
  const weeks = [];
  const maxWeek = moment().year(year).isoWeeksInYear();
  const start = Math.min(Math.max(week, 1), maxWeek);
  const elements = 5;

  for (let i = start, j = year; weeks.length < elements; i === maxWeek ? (i = 1, j++) : i++) {
    weeks.push({ week: i, year: j });
  }
  return weeks;
};

const getProjectDays = (projectId, staffing, weeks, employeeId) =>
  weeks.map(w => {
    let sumWeek = 0;
    // need to pick a date which week is always in the specified year :)
    // startOf week overrides locale-settings. E.g. if locale is 'en' (american),the week
    // starts on Sunday, and then isoWeek skips a day. https://en.wikipedia.org/wiki/Week
    const firstDate = moment().startOf('isoweek').utc([w.year, 2, 1])
      .isoWeek(w.week);

    // moment().add(..) mutates
    for (let i = 0; i < 7; (i++, firstDate.add(1, 'days'))) {
      const staffedDay = staffing.data
        .get(`${employeeId}${projectId}${firstDate.format('YYYY-MM-DD')}`);

      if (staffedDay != null) {
        sumWeek++;
      }
    }
    return sumWeek;
  });

const showProjects = (projects, staffing, weeks, employeeId) =>
  projects.data.toList().map(p => {
    const days = getProjectDays(p.id, staffing, weeks, employeeId);
    return Object.assign({}, p, { days });
  });

const getTableData = (selectedEmployee, selectedYear, selectedWeek, staffing, projects) => {
  if (projects.loading || staffing.loading || selectedEmployee === null) {
    return { loading: true, data: new Immutable.Map() };
  }
  const weeks = showWeeks(selectedWeek, selectedYear);
  const result = {
    loading: false,
    data: {
      weeks,
      projects: showProjects(projects, staffing, weeks, selectedEmployee),
    }
  };
  return result;
};

export default createSelector(
  state => state.selected_employee,
  state => state.selected_year,
  state => state.selected_week,
  state => state.staffing,
  state => state.projects,
  getTableData
);
