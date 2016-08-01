import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './bodyCell';

const StaffingViewBodyRow = (props) => (
  <tr>
    <td><Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link></td>
    {props.weeks.map((w, index) =>
      <StaffingViewBodyCell value={w} key={index} />)}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
