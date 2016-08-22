import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './cell';

const textColor = (days, staffable) => {
  if (days >= staffable || staffable < 1) return 'black';
  return `rgb(${255 - (155 / staffable * days)},0,0)`;
};

const title = (start, end) => `started: ${start}${end === null ? '' : `\nended: ${end}`}`;

const StaffingViewBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric' title={title(props.startDate, props.endDate)}>
      <Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link>
    </td>
    {props.weeks.map((week, index) =>
      (<StaffingViewBodyCell
        value={week.staffable < 1 ? null : week.days * 100 / week.staffable}
        textColor={textColor(week.days, week.staffable)}
        fontWeight={week.days > week.staffable ? 'bold' : 'normal'}
        key={index}
      />)
    )}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  startDate: React.PropTypes.object.isRequired,
  endDate: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
