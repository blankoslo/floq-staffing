import React from 'react';
import { Link } from 'react-router';
import StaffingViewBodyCell from './bodyCell';

const textColor = (value, max) => {
  if (value >= max) return 'rgb(0,0,0)';
  return `rgb(${255 - (155 / max * value)},0,0)`;
};

const StaffingViewBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>
      <Link to={`/staffing/edit/${props.employeeId}`}>{props.employeeName}</Link>
    </td>
    {props.weeks.map((week, index) => {
      if (week.unavailable >= week.staffable) {
        return <td style={{ backgroundColor: 'black' }} />;
      }
      return (<StaffingViewBodyCell
        value={week.days * 100 / week.staffable}
        textColor={textColor(week.days, week.staffable)}
        fontWeight={week.days > week.staffable ? 'bold' : 'normal'}
        backgroundColor={week.unavailable > 0 ? 'grey' : 'white'}
        key={index}
      />);
    })}
  </tr>
);

StaffingViewBodyRow.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewBodyRow;
