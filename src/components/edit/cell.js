import React from 'react';

const onChange = (key, oldValue, func, projectId, startOfWeek) => {
  const number = parseInt(key);
  if (isNaN(number) || number < 0 || number > 7) return;
  const diff = number - oldValue;
  if (diff === 0) return;
  func(projectId, startOfWeek, diff);
};

const EditProjectCell = (props) => {
  let div;
  return (<td
    colSpan={7}
    className='edit'
    onClick={() => { div.focus(); }}
  >
    <div
      className={'edit-selected'}
      tabIndex={0}
      ref={element => (div = element)}
      onFocus={() => { props.onClick(props.projectId, props.startOfWeek); }}
      onKeyUp={e =>
        onChange(e.key, props.value, props.onChange, props.projectId, props.startOfWeek)}
    >
      {props.value}
    </div>
  </td>);
};

EditProjectCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  onClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  startOfWeek: React.PropTypes.string.isRequired,
};

export default EditProjectCell;
