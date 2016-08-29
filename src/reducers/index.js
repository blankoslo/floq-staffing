import ErrorReducer from './error';
import EmployeesReducer from './employees';
import ProjectsReducer from './projects';
import HolidaysReducer from './holidays';
import EmployeeWorkedDaysPerWeekReducer from './employeeWorkedDaysPerWeek';
import WorkedDaysPerWeekReducer from './workedDaysPerWeek';
import SelectedStartOfWeekReducer from './selectedStartOfWeek';
import SelectedWeekSpanReducer from './selectedWeekSpan';

const rootReducer = {
  error: ErrorReducer,
  employees: EmployeesReducer,
  projects: ProjectsReducer,
  holidays: HolidaysReducer,
  employee_worked_days_per_week: EmployeeWorkedDaysPerWeekReducer,
  worked_days_per_week: WorkedDaysPerWeekReducer,
  selected_start_of_week: SelectedStartOfWeekReducer,
  selected_week_span: SelectedWeekSpanReducer,
};

export default rootReducer;
