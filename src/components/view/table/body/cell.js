import React from 'react';

const defaultClassName = (props) =>
  (props.staffedDays > props.staffableDays ? 'bold' : '')
+ (props.staffedDays < props.staffableDays ? ' medium-color' : '');

const selected = 'view-selected';

const StaffingViewBodyCell = (props) =>
  (<td
    colSpan={7}
    className={props.selected === true ? selected : defaultClassName(props)}
  >
    {(props.staffedDays < 1 && props.staffableDays < 1) ? '' :
      `${Math.round(props.staffedDays / props.staffableDays * 100)}%`
    }
  </td>);

StaffingViewBodyCell.propTypes = {
  staffedDays: React.PropTypes.number.isRequired,
  staffableDays: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
};

export default StaffingViewBodyCell;
