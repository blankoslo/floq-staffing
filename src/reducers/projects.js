import { OrderedMap } from 'immutable';

import { FETCH_PROJECTS } from '../actions/index';

const initialState = {
  loading: true,
  data: new OrderedMap()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return {
        loading: false,
        data: new OrderedMap(action.payload.map((x) => [x.id, x]))
          .sortBy((x) => x.id.toLowerCase())
      };
    default:
      return state;
  }
};
