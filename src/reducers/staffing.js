import * as Immutable from 'immutable';

import { GET_STAFFING, CREATE_STAFFING } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_STAFFING:
      // TODO: could possibly replace map with set, if the value is unused.
      return {
        loading: false,
        data: new Immutable.Map(action.payload.map(s => [`${s.employee}${s.project}${s.date}`, s]))
      };
    case CREATE_STAFFING: {
      // TODO: Check d.add_days_to_week (currently string, should it be date?)
      return {
        loading: false,
        data: state.data.merge(action.payload
          .map(d => [`${action.employee}${action.project}${d.add_days_to_week}`,
            {
              employee: action.employee,
              project: action.project,
              date: d.add_days_to_week
            }
          ]))
      };
    }
    default:
      return state;
  }
};
