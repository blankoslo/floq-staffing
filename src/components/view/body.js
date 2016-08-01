import React from 'react';
import Row from './bodyRow';

const StaffingViewBody = (props) => (
  <tbody>
    {props.employees.data.toIndexedSeq().map(e =>
      <Row
        employeeName={e.name}
        weeks={e.weeks}
        key={e.id}
      />)}
  </tbody>
);

StaffingViewBody.propTypes = {
  employees: React.PropTypes.object.isRequired
};

export default StaffingViewBody;
