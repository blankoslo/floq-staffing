import { createSelector } from 'reselect';

const getEmployee = (selectedEmployee, employees) => {
  if (employees.loading) {
    return { loading: true, data: null };
  }

  if (selectedEmployee === null) {
    return {
      loading: true,
      data: null
    };
  }

  const employee = employees.data.find(e => e.id === parseInt(selectedEmployee));

  if (employee === null) {
    return {
      loading: true,
      data: null
    };
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
  state => state.selected_employee,
  state => state.employees,
  getEmployee,
);
