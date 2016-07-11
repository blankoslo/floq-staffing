import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_STAFFING = 'GET_STAFFING';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const CREATE_STAFFING = 'CREATE_STAFFING';

export const apiError = (message) => ({
  type: API_ERROR,
  payload: message
});

export const clearApiError = () => ({
  type: API_ERROR_CLEAR
});

export const getEmployees = () => ({
  type: GET_EMPLOYEES,
  payload: api.getEmployees()
});

export const getProjects = () => ({
  type: GET_PROJECTS,
  payload: api.getProjects()
});

export const getStaffing = () => ({
  type: GET_STAFFING,
  payload: api.getStaffing()
});

export const selectEmployee = (id) => ({
  type: SELECT_EMPLOYEE,
  payload: id
});

export const createStaffing = (data) => ({
  type: CREATE_STAFFING,
  payload: api.createStaffing(data)
});
