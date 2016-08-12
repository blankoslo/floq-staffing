import { combineReducers } from 'redux';

import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import StaffingReducer from './staffing';
import WorkedDaysPerWeekReducer from './workedDaysPerWeek';
import SelectedEmployeeReducer from './selectedEmployee';
import SelectedStartOfWeekReducer from './selectedStartOfWeek';
import SelectedWeekSpanReducer from './selectedWeekSpan';

const rootReducer = combineReducers({
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  staffing: StaffingReducer,
  worked_days_per_week: WorkedDaysPerWeekReducer,
  selected_employee: SelectedEmployeeReducer,
  selected_start_of_week: SelectedStartOfWeekReducer,
  selected_week_span: SelectedWeekSpanReducer
});

export default rootReducer;
