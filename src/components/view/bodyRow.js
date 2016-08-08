import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './bodyCell';

const textColor = (value, max) => {
  if (value >= max) return 'rgb(0,0,0)';
  return `rgb(${255 - (155 / max * value)},0,0)`;
};

const fontWeight = (value, max) => (value > max ? 'bold' : 'normal');

const StaffingViewBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>
      <Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link>
    </td>
    {props.weeks.map((w, index) =>
      <StaffingViewBodyCell
        value={w * 100 / 5}
        textColor={textColor(w, 5)}
        fontWeight={fontWeight(w, 5)}
        key={index}
      />)}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
