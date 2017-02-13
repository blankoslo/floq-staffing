import { List, OrderedMap } from 'immutable';

import { FETCH_ABSENCE } from '../actions';

const initialState = {
  loading: true,
  data: new OrderedMap()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABSENCE:
      return {
        loading: false,
        data: new List(action.payload)
          .map((x) => ({ ...x, name: x.reason }))
          .groupBy((x) => x.employee_id)
          .map((x) => x.groupBy((y) => y.date))
      };
    default:
      return state;
  }
};
