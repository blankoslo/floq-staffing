import { combineReducers } from 'redux';

import ErrorReducer from './error';

const rootReducer = combineReducers({
  error: ErrorReducer
});

export default rootReducer;
