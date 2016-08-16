import React from 'react';
import Cell from './bodyCell';

const StaffingEditBodyRow = (props) => (
  <tr>
    <td className='mdl-data-table__cell--non-numeric'>
      {props.projectname}
    </td>
    {props.weeks.map(week =>
      (<Cell
        value={week.days}
        projectid={props.projectid}
        startOfWeek={week.start}
        weekSum={week.sum}
        onChange={props.onChange}
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
