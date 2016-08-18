import React from 'react';
import Cell from './bodyCell';

const textColor = (days, staffable) => {
  if (days >= staffable || staffable < 1) return 'black';
  return `rgb(${255 - (155 / staffable * days)},0,0)`;
};

const backgroundColor = (week) => {
  if (week.staffable > 0 && week.staffable < 5) return 'lightgrey';
  return 'white';
};

const StaffingEditBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>
      <b>{props.projectid}</b>: {props.projectname}
    </td>
    {props.weeks.map(week =>
      (<Cell
        value={week.employedWeek ? week.days : null}
        projectid={props.projectid}
        startOfWeek={week.start}
        weekSum={week.sum}
        onChange={props.onChange}
        textColor={textColor(week.sum, week.staffable)}
        fontWeight={week.sum > week.staffable ? 'bold' : 'normal'}
        backgroundColor={backgroundColor(week)}
        key={`cell-${week.start}-${props.projectid}`}
      />)
    )}
  </tr>
);

StaffingEditBodyRow.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  projectid: React.PropTypes.string.isRequired,
  projectname: React.PropTypes.string.isRequired,
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingEditBodyRow;
