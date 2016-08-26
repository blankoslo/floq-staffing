import React from 'react';
import Cell from './cell';
import { formatDate } from '../../utils/weekUtil';

const EditProjectRow = (props) => (
  <tr>
    <td className='edit'>
      {props.project.name}
    </td>
    {props.project.weeks.map((week, index) =>
      <Cell
        value={week.days}
        sum={week.sum}
        selected={week.selected}
        onClick={props.onClick}
        onChange={props.onChange}
        projectId={props.project.id}
        startOfWeek={formatDate(week.start)}
        key={index}
      />)}
  </tr>
);

EditProjectRow.propTypes = {
  project: React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default EditProjectRow;
