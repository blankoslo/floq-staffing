import * as Immutable from 'immutable';

import { GET_EMPLOYEE_WORKED_DAYS_PER_WEEK, ADD_STAFFING, REMOVE_STAFFING } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_WORKED_DAYS_PER_WEEK: {
      return {
        loading: false,
        data: action.payload.reduce((weeksMap, week) =>
          weeksMap.set(week.start_of_week, week.projects.reduce((projectMap, projectid) =>
            projectMap.set(projectid, projectMap.get(projectid, 0) + 1)
            , new Immutable.OrderedMap()
          ))
          , new Immutable.OrderedMap()
        )
      };
    }
    case ADD_STAFFING: {
      const week = state.data.get(action.startOfWeek, new Immutable.OrderedMap());
      return {
        loading: false,
        data: state.data.set(
          action.startOfWeek,
          week.set(action.project, week.get(action.project, 0) + action.payload.length)
        )
      };
    }
    case REMOVE_STAFFING: {
      const week = state.data.get(action.startOfWeek, new Immutable.OrderedMap());
      return {
        loading: false,
        data: state.data.set(
          action.startOfWeek,
          week.set(action.project, week.get(action.project, 0) - action.payload.length)
        )
      };
    }
    default:
      return state;
  }
};
