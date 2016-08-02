import { combineReducers } from 'redux';

import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import StaffingReducer from './staffing';
import WorkedDaysPerWeekReducer from './workedDaysPerWeek';
import SelectedEmployeeReducer from './selectedEmployee';
import SelectedYearReducer from './selectedYear';
import SelectedWeekReducer from './selectedWeek';

const rootReducer = combineReducers({
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  staffing: StaffingReducer,
  worked_days_per_week: WorkedDaysPerWeekReducer,
  selected_employee: SelectedEmployeeReducer,
  selected_year: SelectedYearReducer,
  selected_week: SelectedWeekReducer
});

export default rootReducer;
