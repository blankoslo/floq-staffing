import React from 'react';
import { browserHistory } from 'react-router';
import StaffingViewBodyCell from './cell';

const title = (start, end) => `started: ${start}${end === null ? '' : `\nended: ${end}`}`;

const defaultClassName = 'mdl-data-table__cell--non-numeric first-col';

const selected = 'mdl-data-table__cell--non-numeric view-selected';

const onclick = (props) =>
  () =>
    browserHistory.push(`/staffing/${props.selected ? '' :
      `${props.employeeId}/`}?start_of_week=${props.selectedStartOfWeek}`);

const StaffingViewBodyRow = (props) => (
  <tr>
    <td
      className={props.selected ? selected : defaultClassName}
      title={title(props.startDate, props.endDate)}
      onClick={onclick(props)}
    >
      {props.employeeName}
    </td>
    {props.weeks.map((week, index) =>
      (<StaffingViewBodyCell
        selected={props.selected}
        staffedDays={week.days}
        staffableDays={week.staffable}
        key={index}
        employeeId={props.employeeId}
        selectedStartOfWeek={props.selectedStartOfWeek}
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
  selected: React.PropTypes.bool.isRequired,
  selectedStartOfWeek: React.PropTypes.string.isRequired,
};

export default StaffingViewBodyRow;
