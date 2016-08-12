import * as Immutable from 'immutable';

import { GET_HOLIDAYS } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Set() }, action) => {
  switch (action.type) {
    case GET_HOLIDAYS:
      return {
        loading: false,
        data: new Immutable.Set(action.payload.map(e => e.date))
      };
    default:
      return state;
  }
};
