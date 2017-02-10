import { List, OrderedMap } from 'immutable';

import { FETCH_STAFFING, ADD_STAFFING, REMOVE_STAFFING } from '../actions';

const initialState = {
  loading: true,
  data: new OrderedMap()
};

export default (state = initialState, action) => {
  let newDays = null;
  let oldDays = null;
  switch (action.type) {
    case FETCH_STAFFING:
      return ({
        loading: false,
        data: new List(action.payload)
          .map((x) => ({ ...x, name: x.project }))
          .groupBy((x) => x.employee)
          .map((x) => x.groupBy((y) => y.date))
      });
    case ADD_STAFFING:
      newDays = new OrderedMap(
        new List(action.payload)
          .map((x) => x.add_staffing)
          .map((x) => [x, new List([{
            employee: action.employee,
            project: action.project,
            name: action.project,
            date: x
          }])])
      );
      return ({
        loading: false,
        data: state.data.update(
          action.employee,
          new OrderedMap(),
          (x) => x.merge(newDays)
        )
      });
    case REMOVE_STAFFING:
      oldDays = new OrderedMap(
        new List(action.payload)
          .map((x) => x.remove_staffing)
          .map((x) => [x, new List([])])
      );
      return ({
        loading: false,
        data: state.data.update(
          action.employee,
          (x) => x.merge(oldDays)
        )
      });
    default:
      return state;
  }
};
