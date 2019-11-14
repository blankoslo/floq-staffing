import { List } from 'immutable';

import { FETCH_ADMINS } from '../actions/index';

const initialState = {
  loading: true,
  data: new List()
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ADMINS:
      return {
        loading: false,
        data: new List(action.payload.map(admin => admin.employee_id))
      };
    default:
      return state;
  }
};
