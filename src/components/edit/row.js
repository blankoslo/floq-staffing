import React from 'react';
import Cell from './cell';

const EditProjectRow = (props) => (
  <tr>
    <td>
      {props.project.name}
    </td>
    {props.project.weeks.map((week, index) => <Cell value={week.days} key={index} />)}
  </tr>
);

EditProjectRow.propTypes = {
  project: React.PropTypes.object.isRequired
};

export default EditProjectRow;
