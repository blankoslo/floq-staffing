import { combineReducers } from 'redux';

import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import StaffingReducer from './staffing';
import SelectedEmployeeReducer from './selectedEmployee';

const rootReducer = combineReducers({
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  staffing: StaffingReducer,
  selected_employee: SelectedEmployeeReducer
});

export default rootReducer;
