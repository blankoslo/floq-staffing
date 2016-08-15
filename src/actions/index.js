import * as api from '../apiclient';
import { formatDate } from '../utils/weekUtil';

export const API_ERROR = 'API_ERROR';
export const API_ERROR_CLEAR = 'API_ERROR_CLEAR';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_WORKED_DAYS_PER_WEEK = 'GET_WORKED_DAYS_PER_WEEK';
export const GET_EMPLOYEE_WORKED_DAYS_PER_WEEK = 'GET_EMPLOYEE_WORKED_DAYS_PER_WEEK';
export const SELECT_EMPLOYEE = 'SELECT_EMPLOYEE';
export const SELECT_START_OF_WEEK = 'SELECT_START_OF_WEEK';
export const SELECT_WEEK_SPAN = 'SELECT_WEEK_SPAN';
export const ADD_STAFFING = 'ADD_STAFFING';
export const REMOVE_STAFFING = 'REMOVE_STAFFING';
export const GET_HOLIDAYS = 'GET_HOLIDAYS';

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

export const getHolidays = () => ({
  type: GET_HOLIDAYS,
  payload: api.getHolidays()
});

export const getWorkedDaysPerWeek = (startOfWeek, weekSpan) => ({
  type: GET_WORKED_DAYS_PER_WEEK,
  payload: api.getWorkedDaysPerWeek(
    { in_start_of_week: formatDate(startOfWeek), in_number_of_weeks: weekSpan }
  )
});

export const getEmployeeWorkedDaysPerWeek = (employeeId, startOfWeek, weekSpan) => ({
  type: GET_EMPLOYEE_WORKED_DAYS_PER_WEEK,
  payload: api.getEmployeeWorkedDaysPerWeek(
    { in_employee: employeeId,
      in_start_of_week: formatDate(startOfWeek),
      in_number_of_weeks: weekSpan
    }
  )
});

export const selectEmployee = (id) => ({
  type: SELECT_EMPLOYEE,
  payload: id
});

export const selectStartOfWeek = (startOfWeek) => ({
  type: SELECT_START_OF_WEEK,
  payload: startOfWeek
});

export const selectWeekSpan = (weekSpan) => ({
  type: SELECT_WEEK_SPAN,
  payload: weekSpan
});

export const addStaffing = (data) => ({
  type: ADD_STAFFING,
  payload: api.addStaffing(data),
  employee: data.in_employee,
  project: data.in_project,
  startOfWeek: data.in_start_of_week
});

export const removeStaffing = (data) => ({
  type: REMOVE_STAFFING,
  payload: api.removeStaffing(data),
  employee: data.in_employee,
  project: data.in_project,
  startOfWeek: data.in_start_of_week
});
