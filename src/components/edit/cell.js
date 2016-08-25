import React from 'react';

const selected = 'edit-selected';

const onClick = (func, projectId, startOfWeek) =>
  () => func(projectId, startOfWeek);

const EditProjectCell = (props) => (
  <td
    colSpan={7}
    className='edit'
    onClick={onClick(props.onClick, props.projectId, props.startOfWeek)}
  >
    <div className={props.selected ? selected : ''}>
      {props.value}
    </div>
  </td>
);

EditProjectCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  startOfWeek: React.PropTypes.string.isRequired,
};

export default EditProjectCell;
