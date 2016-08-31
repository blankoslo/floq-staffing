import React from 'react';
import { browserHistory } from 'react-router';

const defaultClassName = (props) =>
  (props.staffedDays > props.staffableDays ? 'bold' : '')
+ (props.staffedDays < props.staffableDays ? ' medium-color' : '');

const selected = 'view-selected';

const onclick = (props) =>
  () =>
    browserHistory.push(`/staffing/${props.selected ? '' :
      `${props.employeeId}/`}?start_of_week=${props.selectedStartOfWeek}`);

const StaffingViewBodyCell = (props) =>
  (<td
    colSpan={7}
    className={props.selected === true ? selected : defaultClassName(props)}
    onClick={onclick(props)}
  >
    {(props.staffedDays < 1 && props.staffableDays < 1) ? '¯\\_(ツ)_/¯' :
      `${Math.round((props.staffedDays / props.staffableDays) * 100)}%`
    }
  </td>);

StaffingViewBodyCell.propTypes = {
  staffedDays: React.PropTypes.number.isRequired,
  staffableDays: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  employeeId: React.PropTypes.number.isRequired,
  selectedStartOfWeek: React.PropTypes.string.isRequired,
};

export default StaffingViewBodyCell;
