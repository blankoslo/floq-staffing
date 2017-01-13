import { OrderedMap, List } from 'immutable';

import { FETCH_HOLIDAYS } from '../actions/index';

const initialState = {
  loading: true,
  data: new OrderedMap()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOLIDAYS:
      return {
        loading: false,
        data: new OrderedMap(action.payload
                             .map((x) => [x.date, new List([x])]))
      };
    default:
      return state;
  }
};
