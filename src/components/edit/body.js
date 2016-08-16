import React from 'react';
import Row from './bodyRow';

const StaffingEditBody = (props) => (
  <tbody>
    {props.body.map((row, index) =>
      <Row
        projectid={row.projectid}
        projectname={row.projectname}
        weeks={row.weeks}
        onChange={props.onChange}
        key={index}
      />)}
  </tbody>
);

StaffingEditBody.propTypes = {
  body: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default StaffingEditBody;
