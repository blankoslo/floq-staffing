import * as Immutable from 'immutable';

import { GET_STAFFING } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_STAFFING:
      // TODO: could possibly replace map with set, if the value is unused.
      return {
        loading: false,
        data: new Immutable.Map(action.payload.map(s => [`${s.employee}${s.project}${s.date}`, s]))
      };
    default:
      return state;
  }
};
