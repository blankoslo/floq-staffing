import { combineReducers } from 'redux';

import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import HolidaysReducer from './holidays';
import EmployeeWorkedDaysPerWeekReducer from './employeeWorkedDaysPerWeek';
import WorkedDaysPerWeekReducer from './workedDaysPerWeek';
import SelectedEmployeeReducer from './selectedEmployee';
import SelectedStartOfWeekReducer from './selectedStartOfWeek';
import SelectedWeekSpanReducer from './selectedWeekSpan';
import SelectedCellReducer from './selectedCell';

const rootReducer = combineReducers({
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  holidays: HolidaysReducer,
  employee_worked_days_per_week: EmployeeWorkedDaysPerWeekReducer,
  worked_days_per_week: WorkedDaysPerWeekReducer,
  selected_employee: SelectedEmployeeReducer,
  selected_start_of_week: SelectedStartOfWeekReducer,
  selected_week_span: SelectedWeekSpanReducer,
  selected_cell: SelectedCellReducer,
});

export default rootReducer;
