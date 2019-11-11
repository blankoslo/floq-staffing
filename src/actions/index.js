import dateFns from 'date-fns';
import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';

export const FETCH_EMPLOYEES = 'FETCH_EMPLOYEES';
export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const FETCH_HOLIDAYS = 'FETCH_HOLIDAYS';
export const FETCH_ABSENCE = 'FETCH_ABSENCE';
export const FETCH_ABSENCE_REASONS = 'FETCH_ABSENCE_REASONS';
export const FETCH_STAFFING = 'FETCH_STAFFING';
export const FETCH_ADMINS = 'FETCH_ADMINS';

export const SET_TIMELINE = 'SET_TIMELINE';
export const SET_TIMELINE_MODE = 'SET_TIMELINE_MODE';
export const TIMELINE_MODE_CUSTOMERS = 'TIMELINE_MODE_CUSTOMERS';
export const TIMELINE_MODE_EMPLOYEES = 'TIMELINE_MODE_EMPLOYEES';
export const SET_TIMELINE_SHOW_SUMMARY = 'SET_TIMELINE_SHOW_SUMMARY';
export const SET_TIMELINE_FILTER = 'SET_TIMELINE_FILTER';
export const SET_TIMELINE_FILTER_AVAILABLE_TIME = 'SET_TIMELINE_FILTER_AVAILABLE_TIME';
export const EXPAND_CUSTOMERS = 'EXPAND_CUSTOMERS';
export const COLLAPSE_CUSTOMERS = 'COLLAPSE_CUSTOMERS';
export const EXPAND_EMPLOYEES = 'EXPAND_EMPLOYEES';
export const COLLAPSE_EMPLOYEES = 'COLLAPSE_EMPLOYEES';

export const STAFFING_TOOL_SELECT_PROJECTS = 'STAFFING_TOOL_SELECT_PROJECTS';
export const STAFFING_TOOL_DESELECT_PROJECTS = 'STAFFING_TOOL_DESELECT_PROJECTS';
export const STAFFING_TOOL_SELECT_WEEKS = 'STAFFING_TOOL_SELECT_WEEKS';
export const STAFFING_TOOL_DESELECT_WEEKS = 'STAFFING_TOOL_DESELECT_WEEKS';
export const STAFFING_TOOL_CLEAR = 'STAFFING_TOOL_CLEAR';

export const ADD_STAFFING = 'ADD_STAFFING';
export const REMOVE_STAFFING = 'REMOVE_STAFFING';
export const ADD_PROJECT = 'ADD_PROJECT';


export const apiError = (message) => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});

export const fetchEmployees = () => ({
  type: FETCH_EMPLOYEES,
  payload: api.fetchEmployees()
});

export const fetchProjects = () => ({
  type: FETCH_PROJECTS,
  payload: api.fetchProjects()
});

export const fetchHolidays = () => ({
  type: FETCH_HOLIDAYS,
  payload: api.fetchHolidays()
});

export const fetchAbsence = (fromDate, toDate) => ({
  type: FETCH_ABSENCE,
  payload: api.fetchAbsence(fromDate, toDate)
});

export const fetchAbsenceReasons = () => ({
  type: FETCH_ABSENCE_REASONS,
  payload: api.fetchAbsenceReasons()
});

export const fetchStaffing = (startDate, endDate) => (dispatch) => {
  dispatch({
    type: FETCH_STAFFING,
    payload: api.fetchStaffing(startDate, endDate)
  });
};

export const fetchAdmins = () => ({
  type: FETCH_ADMINS,
  payload: api.fetchAdmins()
})

export const setTimeline = (startDate, endDateIn) =>
  (dispatch, getState) => {
    const state = getState().timeline;
    const defaultDeltaMonths = dateFns.differenceInMonths(
      state.endDate,
      state.startDate
    );
    const defaultEndDate = dateFns.addMonths(
      startDate,
      defaultDeltaMonths
    );
    const endDate =
            (dateFns.isAfter(endDateIn, startDate) &&
             endDateIn) || defaultEndDate;
    dispatch({ type: SET_TIMELINE, startDate, endDate });
    dispatch(fetchStaffing(startDate, endDate));
    dispatch(fetchAbsence(startDate, endDate));
  };

export const setTimelineMode = (mode) => ({
  type: SET_TIMELINE_MODE,
  mode
});

export const setTimelineFilterAvailableTime = (filterAvailableTime) => ({
  type: SET_TIMELINE_FILTER_AVAILABLE_TIME,
  filterAvailableTime
});

export const setTimelineShowSummary = (showSummary) => ({
  type: SET_TIMELINE_SHOW_SUMMARY,
  showSummary
});

export const setTimelineFilter = (filter) => ({
  type: SET_TIMELINE_FILTER,
  filter
});

export const expandCustomers = (customers) => ({
  type: EXPAND_CUSTOMERS,
  customers
});

export const collapseCustomers = (customers) => ({
  type: COLLAPSE_CUSTOMERS,
  customers
});

export const expandEmployees = (employees) => ({
  type: EXPAND_EMPLOYEES,
  employees
});

export const collapseEmployees = (employees) => ({
  type: COLLAPSE_EMPLOYEES,
  employees
});

export const staffingToolSelectProjects = (employeeProjects) => ({
  type: STAFFING_TOOL_SELECT_PROJECTS,
  employeeProjects
});

export const staffingToolDeselectProjects = (employeeProjects) => ({
  type: STAFFING_TOOL_DESELECT_PROJECTS,
  employeeProjects
});

export const staffingToolSelectWeeks = (weeks) => ({
  type: STAFFING_TOOL_SELECT_WEEKS,
  weeks
});

export const staffingToolDeselectWeeks = (weeks) => ({
  type: STAFFING_TOOL_DESELECT_WEEKS,
  weeks
});

export const staffingToolClear = () => ({
  type: STAFFING_TOOL_CLEAR
});

export const addStaffing = (employee, project, year, week, days) => ({
  type: ADD_STAFFING,
  payload: api.addStaffing(employee, project, year, week, days),
  employee,
  project,
  year,
  week,
  days
});

export const removeStaffing = (employee, project, year, week, days) => ({
  type: REMOVE_STAFFING,
  payload: api.removeStaffing(employee, project, year, week, days),
  employee,
  project,
  year,
  week,
  days
});

export const addProject = (employeeId, projectId) => ({
  type: ADD_PROJECT,
  employeeId,
  projectId
});
