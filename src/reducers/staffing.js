import * as Immutable from 'immutable';

import { GET_STAFFING, ADD_STAFFING, REMOVE_STAFFING } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Set() }, action) => {
  switch (action.type) {
    case GET_STAFFING:
      return {
        loading: false,
        data: new Immutable.Set(action.payload.map(s => `${s.employee}${s.project}${s.date}`))
      };
    case ADD_STAFFING:
      return {
        loading: false,
        data: state.data.merge(action.payload
          .map(d => `${action.employee}${action.project}${d.add_days_to_week}`))
      };
    case REMOVE_STAFFING:
      return {
        loading: false,
        data: state.data.subtract(action.payload
          .map(d => `${action.employee}${action.project}${d.remove_days_from_week}`))
      };
    default:
      return state;
  }
};
