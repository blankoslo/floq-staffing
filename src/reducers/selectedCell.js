import { SELECT_CELL, SELECT_EMPLOYEE } from '../actions/index';

export default (state = null, action) => {
  if (action.type === SELECT_CELL) {
    return {
      project: action.project,
      startOfWeek: action.startOfWeek,
    };
  }
  if (action.type === SELECT_EMPLOYEE) return null;

  return state;
};
