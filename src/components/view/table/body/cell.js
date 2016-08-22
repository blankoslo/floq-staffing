import React from 'react';

const StaffingViewBodyCell = (props) => {
  if (props.staffedDays < 1 && props.staffableDays < 1) return null;
  return (<td
    colSpan={7}
    className={
        (props.staffedDays > props.staffableDays ? 'bold' : '')
      + (props.staffedDays < props.staffableDays ? ' medium-color' : '')
    }
  >
    {`${Math.round(props.staffedDays / props.staffableDays * 100)}%`}
  </td>);
};

StaffingViewBodyCell.propTypes = {
  staffedDays: React.PropTypes.number.isRequired,
  staffableDays: React.PropTypes.number.isRequired,
};

export default StaffingViewBodyCell;
