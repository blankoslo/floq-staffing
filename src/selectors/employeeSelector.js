import { createSelector } from 'reselect';

const getEmployee = (employeeId, employees) => {
  if (employees.loading || employeeId === null || isNaN(employeeId)) {
    return { loading: true, data: null };
  }

  const employee = employees.data.find(e => e.id === employeeId);

  if (employee === null) {
    return { loading: true, data: null };
  }

  return {
    loading: false,
    data: {
      id: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
      date_of_employment: employee.date_of_employment,
      termination_date: employee.termination_date
    }
  };
};

export default createSelector(
  (_, props) => parseInt(props.params.employeeId),
  state => state.employees,
  getEmployee,
);
