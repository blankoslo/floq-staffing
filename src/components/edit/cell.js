import React from 'react';

const onChange = (key, sum, oldValue, func, projectId, startOfWeek) => {
  const number = parseInt(key);
  if (isNaN(number) || number < 0 || number > 7) return;
  const diff = number - oldValue;
  if (diff === 0 || diff + sum > 7) return;
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
      onKeyUp={e =>
        onChange(e.key, props.sum, props.value, props.onChange, props.projectId, props.startOfWeek)}
    >
      {props.value}
    </div>
  </td>);
};

EditProjectCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  sum: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  projectId: React.PropTypes.string.isRequired,
  startOfWeek: React.PropTypes.string.isRequired,
};

export default EditProjectCell;
