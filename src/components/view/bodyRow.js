import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './bodyCell';

const textColor = (days, staffable) => {
  if (days >= staffable || staffable < 1) return 'black';
  return `rgb(${255 - (155 / staffable * days)},0,0)`;
};

const backgroundColor = (week) => {
  if (week.staffable < 1) return 'white';
  if (week.unavailable >= week.staffable) return 'grey';
  if (week.unavailable > 0 || week.staffable < 5) return 'lightgrey';
  return 'white';
};

const StaffingViewBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>
      <Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link>
    </td>
    {props.weeks.map((week, index) =>
      (<StaffingViewBodyCell
        value={week.staffable < 1 ? null : week.days * 100 / week.staffable}
        textColor={textColor(week.days, week.staffable)}
        fontWeight={week.days > week.staffable ? 'bold' : 'normal'}
        backgroundColor={backgroundColor(week)}
        key={index}
      />)
    )}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
