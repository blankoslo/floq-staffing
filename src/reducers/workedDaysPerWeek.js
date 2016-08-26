import * as Immutable from 'immutable';

import { GET_WORKED_DAYS_PER_WEEK, ADD_STAFFING, REMOVE_STAFFING } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
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
                  projects: new Immutable.OrderedSet(item.projects)
                }));
          }
          return result.set(item.employee, new Immutable.OrderedMap(
            [[
              item.start_of_week,
              { days: item.days, projects: new Immutable.OrderedSet(item.projects) }
            ]]
          ));
        }, new Immutable.OrderedMap())
      };
    }
    case ADD_STAFFING: {
      const employee = state.data.get(action.employee);
      const week = employee
        .get(action.startOfWeek, { days: 0, projects: new Immutable.OrderedSet() });

      return {
        loading: false,
        data: state.data.set(
          action.employee,
          employee.set(
            action.startOfWeek,
            {
              days: week.days + action.payload.length,
              projects: week.projects.add(action.project)
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
              projects: week.projects.delete(action.project)
            }
          )
        )
      };
    }
    default:
      return state;
  }
};
