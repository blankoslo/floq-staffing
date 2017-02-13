import { OrderedMap } from 'immutable';

import { FETCH_EMPLOYEES } from '../actions/index';

const initialState = {
  loading: true,
  data: new OrderedMap()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EMPLOYEES:
      return {
        loading: false,
        data: new OrderedMap(action.payload
                             .map((e) => [e.id, e]))
          .sortBy((e) => `${e.first_name}${e.last_name}`.toLowerCase())
      };
    default:
      return state;
  }
};
