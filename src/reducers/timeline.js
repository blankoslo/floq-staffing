import { Set } from 'immutable';
import dateFns from 'date-fns';

import {
  SET_TIMELINE, SET_TIMELINE_MODE, TIMELINE_MODE_EMPLOYEES,
  SET_TIMELINE_SHOW_SUMMARY, SET_TIMELINE_FILTER_AVAILABLE_TIME,
  SET_TIMELINE_FILTER,
  EXPAND_CUSTOMERS, COLLAPSE_CUSTOMERS, EXPAND_EMPLOYEES, COLLAPSE_EMPLOYEES
} from '../actions';


const addWeeks = (today, numOfWeeks) => {
  today.setDate(numOfWeeks * 7);
  return today;
};

const today = () => new Date();

const initialState = {
  mode: TIMELINE_MODE_EMPLOYEES,
  startDate: today(),
  endDate: addWeeks(today(), 12),
  showSummary: false,
  filterAvailableTime: false,
  filter: '',
  expandedCustomers: new Set(),
  expandedEmployees: new Set()
};

export default (state = initialState, action) => {
  const defaultDeltaMonths = dateFns.differenceInMonths(
    state.endDate,
    state.startDate
  );
  const defaultEndDate = dateFns.addMonths(
    action.startDate,
    defaultDeltaMonths
  );
  const endDate =
          (dateFns.isAfter(action.endDate, action.startDate) &&
           action.endDate) || defaultEndDate;
  switch (action.type) {
    case SET_TIMELINE:
      return ({
        ...state,
        startDate: action.startDate,
        endDate: dateFns.endOfWeek(endDate)
      });
    case SET_TIMELINE_MODE:
      return ({
        ...state,
        mode: action.mode,
        expandedCustomers: new Set(),
        expandedEmployees: new Set()
      });
    case SET_TIMELINE_FILTER_AVAILABLE_TIME:
      return ({
        ...state,
        filterAvailableTime: action.filterAvailableTime
      });
    case SET_TIMELINE_SHOW_SUMMARY:
      return ({
        ...state,
        showSummary: action.showSummary
      });
    case SET_TIMELINE_FILTER:
      return ({
        ...state,
        filter: action.filter
      });
    case EXPAND_CUSTOMERS:
      return ({
        ...state,
        expandedCustomers: state.expandedCustomers.union(action.customers)
      });
    case COLLAPSE_CUSTOMERS:
      return ({
        ...state,
        expandedCustomers: state.expandedCustomers.subtract(action.customers)
      });
    case EXPAND_EMPLOYEES:
      return ({
        ...state,
        expandedEmployees: state.expandedEmployees.union(action.employees)
      });
    case COLLAPSE_EMPLOYEES:
      return ({
        ...state,
        expandedEmployees: state.expandedEmployees.subtract(action.employees)
      });
    default:
      return state;
  }
};
