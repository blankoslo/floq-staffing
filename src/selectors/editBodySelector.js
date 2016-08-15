import { createSelector } from 'reselect';
import * as Immutable from 'immutable';
import weeksSelector from '../selectors/weeksSelector';
import { formatDate } from '../utils/weekUtil';

const getEmployee = (weeks, workedDaysPerWeek, projects) => {
  if (workedDaysPerWeek.loading || projects.loading) {
    return { loading: true, data: null };
  }
  return {
    loading: false,
    data: workedDaysPerWeek.data
      .toIndexedSeq()
      .reduce((total, item) => total.merge(item.keySeq()), new Immutable.OrderedSet())
      .map(projectid => ({
        projectid,
        projectname: projects.data.get(projectid).name,
        daysPerWeek: weeks.map(week =>
          workedDaysPerWeek.data.get(formatDate(week), new Immutable.Map()).get(projectid, 0))
      }))
  };
};

export default createSelector(
  weeksSelector,
  state => state.employee_worked_days_per_week,
  state => state.projects,
  getEmployee,
);
