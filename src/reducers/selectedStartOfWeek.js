import moment from 'moment';
import { SELECT_START_OF_WEEK } from '../actions/index';

export default (state = moment().day('Monday'), action) => {
  if (action.type === SELECT_START_OF_WEEK && action.payload && action.payload !== null) {
    return moment(action.payload);
  }
  return state;
};
