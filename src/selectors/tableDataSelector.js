import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

const getProjectDays = (projectId, staffing, weeks, employeeId) =>
  weeks.map(startOfWeek =>
    new Immutable.Range(0, 7).reduce((total, item) => {
      const date = startOfWeek.clone();
      date.add(item, 'days');
      return total + (staffing.data
          .contains(`${employeeId}${projectId}${formatDate(date)}`) ? 1 : 0);
    }, 0)
  );

const showProjects = (weeks, employeeId, staffing, projects) =>
  projects.data.toList().map(p => {
    const days = getProjectDays(p.id, staffing, weeks, employeeId);
    return Object.assign({}, p, { days });
  });

const getTableData = (weeks, selectedEmployee, staffing, projects) => {
  if (projects.loading || staffing.loading || selectedEmployee === null) {
    return { loading: true, data: new Immutable.Map() };
  }
  const projectsWithWeeks = showProjects(weeks, selectedEmployee, staffing, projects);
  const result = {
    loading: false,
    data: {
      weeks: weeks.map((startOfWeek, index) => ({
        startOfWeek,
        total: projectsWithWeeks
          .map(p => p.days.get(index))
          .reduce((total, item) => total + parseInt(item), 0)
      })),
      projects: projectsWithWeeks,
    }
  };
  return result;
};

export default createSelector(
  weeksSelector,
  state => state.selected_employee,
  state => state.staffing,
  state => state.projects,
  getTableData
);
