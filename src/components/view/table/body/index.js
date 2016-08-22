import React from 'react';
import Row from './row';

const StaffingViewBody = (props) => (
  <tbody>
    {props.body.toIndexedSeq().map(e =>
      <Row
        employeeName={e.name}
        employeeId={e.id}
        weeks={e.weeks}
        key={e.id}
      />)}
  </tbody>
);

StaffingViewBody.propTypes = {
  body: React.PropTypes.object.isRequired
};

export default StaffingViewBody;
