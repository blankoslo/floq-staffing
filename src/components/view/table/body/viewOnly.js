// @flow
import React from 'react';
import Row from './row';

const row = (employee, index, selectedStartOfWeek) =>
  <Row
    selected={false}
    selectedStartOfWeek={selectedStartOfWeek}
    employeeName={employee.name}
    employeeId={employee.id}
    weeks={employee.weeks}
    startDate={employee.startDate}
    endDate={employee.endDate}
    key={index}
  />;

const StaffingViewBody = (props : Object) => (
  <tbody>
    {props.employees.map((e, index) => row(e, index, props.selectedStartOfWeek))}
  </tbody>
);

StaffingViewBody.propTypes = {
  employees: React.PropTypes.object.isRequired,
  selectedStartOfWeek: React.PropTypes.string.isRequired,
};

export default StaffingViewBody;
