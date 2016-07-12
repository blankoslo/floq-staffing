import { SELECT_WEEK } from '../actions/index';

export default (state = 1, action) => {
  if (action.type === SELECT_WEEK && action.payload && action.payload !== null) {
    return action.payload;
  }
  return state;
};
