// @flow
import * as Immutable from 'immutable';

import { GET_WORKED_DAYS_PER_WEEK, ADD_STAFFING, REMOVE_STAFFING } from '../actions/index';

const createProjectMap = projects =>
  projects.reduce((result, project) =>
    result.update(project, 0, n => n + 1)
  , new Immutable.OrderedMap());

const changeProjectMap = (map, project, change) => {
  if (map.has(project) && change < 0) {
    return map.delete(project);
  }
  if (change > 0) {
    return map.update(project, 0, n => n + 1);
  }
  return map;
};

export default (state : Object = { loading: true, data: new Immutable.Map() }, action : Object) => {
  switch (action.type) {
    case GET_WORKED_DAYS_PER_WEEK: {
      return {
        loading: false,
        data: action.payload.reduce((result, item) => {
          if (result.has(item.employee)) {
            return result.set(
              item.employee,
              result
                .get(item.employee)
                .set(item.start_of_week, {
                  days: item.days,
                  projects: createProjectMap(item.projects)
                }));
          }
          return result.set(item.employee, new Immutable.OrderedMap(
            [[
              item.start_of_week,
              { days: item.days, projects: createProjectMap(item.projects) }
            ]]
          ));
        }, new Immutable.OrderedMap())
      };
    }
    case ADD_STAFFING: {
      const employee = state.data.get(action.employee, new Immutable.OrderedMap());
      const week = employee
        .get(action.startOfWeek, { days: 0, projects: new Immutable.OrderedMap() });

      return {
        loading: false,
        data: state.data.set(
          action.employee,
          employee.set(
            action.startOfWeek,
            {
              days: week.days + action.payload.length,
              projects: changeProjectMap(week.projects, action.project, 1)
            }
          )
        )
      };
    }
    case REMOVE_STAFFING: {
      const employee = state.data.get(action.employee);
      const week = employee.get(action.startOfWeek);
      return {
        loading: false,
        data: state.data.set(
          action.employee,
          employee.set(
            action.startOfWeek,
            {
              days: week.days - action.payload.length,
              projects: changeProjectMap(week.projects, action.project, -1)
            }
          )
        )
      };
    }
    default:
      return state;
  }
};
