import * as Immutable from 'immutable';

import { GET_WORKED_DAYS_PER_WEEK } from '../actions/index';

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
                  projects: new Immutable.List(item.projects)
                }));
          }
          return result.set(item.employee, new Immutable.Map(
            [[
              item.start_of_week,
              { days: item.days, projects: new Immutable.List(item.projects) }
            ]]
          ));
        }, new Immutable.Map())
      };
    }
    default:
      return state;
  }
};
