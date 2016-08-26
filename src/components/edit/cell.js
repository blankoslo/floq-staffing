import React from 'react';

const EditProjectCell = (props) => {
  let div;
  return (<td
    colSpan={7}
    className='edit'
    onClick={() => {
      div.focus();
      props.onClick(props.projectId, props.startOfWeek);
    }}
  >
    <div
      className={'edit-selected'}
      tabIndex={0}
      ref={element => (div = element)}
    >
      {props.value}
    </div>
  </td>);
};

EditProjectCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  startOfWeek: React.PropTypes.string.isRequired,
};

export default EditProjectCell;
