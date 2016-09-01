// @flow
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
    key={`view-row-last-${index}`}
  />;

const TableBodyFirstPart = (props : Object) => (
  <tbody>
    {props.employees
      .skipUntil(e => e.id === props.selectedEmployee)
      .filter(e => e.id !== props.selectedEmployee).map((e) =>
        row(e, e.id, props.selectedStartOfWeek))
    }
  </tbody>
);

TableBodyFirstPart.propTypes = {
  employees: React.PropTypes.object.isRequired,
  selectedEmployee: React.PropTypes.number.isRequired,
  selectedStartOfWeek: React.PropTypes.string.isRequired,
};

export default TableBodyFirstPart;
