import React from 'react';
import Row from './row';

const row = (employee, index, selectedStartOfWeek, selected = false) =>
  <Row
    selectedStartOfWeek={selectedStartOfWeek}
    selected={selected}
    employeeName={employee.name}
    employeeId={employee.id}
    weeks={employee.weeks}
    startDate={employee.startDate}
    endDate={employee.endDate}
    key={`view-row-first-${index}`}
  />;

const TableBodyFirstPart = (props) => (
  <tbody>
    {props.employees.takeWhile(e => e.id !== props.selectedEmployee).map(e =>
        row(e, e.id, props.selectedStartOfWeek))}
    {row(
      props.employees.find(e => e.id === props.selectedEmployee),
      props.selectedEmployee,
      props.selectedStartOfWeek,
      true)
    }
  </tbody>
);

TableBodyFirstPart.propTypes = {
  employees: React.PropTypes.object.isRequired,
  selectedEmployee: React.PropTypes.number.isRequired,
  selectedStartOfWeek: React.PropTypes.string.isRequired,
};

export default TableBodyFirstPart;
