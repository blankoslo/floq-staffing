import React from 'react';

const StaffingViewBodyCell = (props) =>
  (<td
    colSpan={7}
    className={
        (props.staffedDays > props.staffableDays ? 'bold' : '')
      + (props.staffedDays < props.staffableDays ? ' medium-color' : '')
    }
  >
    {(props.staffedDays < 1 && props.staffableDays < 1) ? '' :
      `${Math.round(props.staffedDays / props.staffableDays * 100)}%`
    }
  </td>);

StaffingViewBodyCell.propTypes = {
  staffedDays: React.PropTypes.number.isRequired,
  staffableDays: React.PropTypes.number.isRequired,
};

export default StaffingViewBodyCell;
