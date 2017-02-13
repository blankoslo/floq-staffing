import { Map, OrderedSet, Set, Record } from 'immutable';

import {
  STAFFING_TOOL_SELECT_PROJECTS,
  STAFFING_TOOL_DESELECT_PROJECTS,
  STAFFING_TOOL_SELECT_WEEKS,
  STAFFING_TOOL_DESELECT_WEEKS,
  STAFFING_TOOL_CLEAR,
  ADD_PROJECT
} from '../actions';

const initialState = {
  selectedProjects: new Set(),
  selectedWeeks: new Set(),
  newProjects: new Map()
};

export const EmployeeProject = new Record({
  employeeId: 0,
  projectId: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case STAFFING_TOOL_SELECT_PROJECTS:
      return ({
        ...state,
        selectedProjects: state.selectedProjects.union(
          action.employeeProjects.map((x) => new EmployeeProject({
            employeeId: x.employeeId,
            projectId: x.projectId
          })))
      });
    case STAFFING_TOOL_DESELECT_PROJECTS:
      return ({
        ...state,
        selectedProjects: state.selectedProjects.subtract(
          action.employeeProjects.map((x) => new EmployeeProject({
            employeeId: x.employeeId,
            projectId: x.projectId
          })))
      });
    case STAFFING_TOOL_SELECT_WEEKS:
      return ({
        ...state,
        selectedWeeks: state.selectedWeeks.union(action.weeks)
      });
    case STAFFING_TOOL_DESELECT_WEEKS:
      return ({
        ...state,
        selectedWeeks: state.selectedWeeks.subtract(action.weeks)
      });
    case STAFFING_TOOL_CLEAR:
      return {
        ...state,
        selectedProjects: initialState.selectedProjects,
        selectedWeeks: initialState.selectedWeeks
      };
    case ADD_PROJECT:
      return {
        ...state,
        newProjects: state.newProjects
          .update(
            action.employeeId,
            new OrderedSet(),
            (x) => x.add(action.projectId)
          )
      };
    default:
      return state;
  }
};
