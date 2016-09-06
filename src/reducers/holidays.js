import * as Immutable from 'immutable';

import { GET_HOLIDAYS } from '../actions/index';

export default (state = { loading: true, data: new Immutable.Map() }, action) => {
  switch (action.type) {
    case GET_HOLIDAYS:
      return {
        loading: false,
        data: new Immutable.Map(action.payload.map(x => [x.date, x]))
      };
    default:
      return state;
  }
};
