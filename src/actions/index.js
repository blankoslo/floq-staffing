import * as api from '../apiclient';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_STAFFING = 'GET_STAFFING';
export const GET_WORKED_DAYS_PER_WEEK = 'GET_WORKED_DAYS_PER_WEEK';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SELECT_YEAR = 'SELECT_YEAR';
export const SELECT_WEEK = 'SELECT_WEEK';
export const ADD_STAFFING = 'ADD_STAFFING';
export const REMOVE_STAFFING = 'REMOVE_STAFFING';

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

export const getWorkedDaysPerWeek = (year, week) => ({
  type: GET_WORKED_DAYS_PER_WEEK,
  payload: api.getWorkedDaysPerWeek(
    { in_year: year, in_week: week, in_number_of_weeks: 5 }
  )
});

export const selectEmployee = (id) => ({
  type: SELECT_EMPLOYEE,
  payload: id
});

export const selectYear = (year) => ({
  type: SELECT_YEAR,
  payload: year
});

export const selectWeek = (week) => ({
  type: SELECT_WEEK,
  payload: week
});

export const addStaffing = (data) => ({
  type: ADD_STAFFING,
  payload: api.addStaffing(data),
  employee: data.in_employee,
  project: data.in_project
});

export const removeStaffing = (data) => ({
  type: REMOVE_STAFFING,
  payload: api.removeStaffing(data),
  employee: data.in_employee,
  project: data.in_project
});
