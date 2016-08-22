import React from 'react';
import Row from './row';

const StaffingViewBody = (props) => (
  <tbody>
    {props.body.toIndexedSeq().map((e, index) =>
      <Row
        employeeName={e.name}
        employeeId={e.id}
        weeks={e.weeks}
        startDate={e.startDate}
        endDate={e.endDate}
        key={index}
      />)}
  </tbody>
);

StaffingViewBody.propTypes = {
  body: React.PropTypes.object.isRequired
};

export default StaffingViewBody;
