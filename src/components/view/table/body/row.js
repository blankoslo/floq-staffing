import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './cell';

const title = (start, end) => `started: ${start}${end === null ? '' : `\nended: ${end}`}`;

const StaffingViewBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric' title={title(props.startDate, props.endDate)}>
      <Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link>
    </td>
    {props.weeks.map((week, index) =>
      (<StaffingViewBodyCell
        staffedDays={week.days}
        staffableDays={week.staffable}
        key={index}
      />)
    )}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  startDate: React.PropTypes.string.isRequired,
  endDate: React.PropTypes.string,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
