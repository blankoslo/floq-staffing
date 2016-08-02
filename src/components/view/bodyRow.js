import React from 'react';
import StaffingViewBodyCell from './bodyCell';

const StaffingViewBodyRow = (props) => (
  <tr>
    <td>{props.employeeName}</td>
    {props.weeks.map((w, index) =>
      <StaffingViewBodyCell value={w} key={index} />)}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
