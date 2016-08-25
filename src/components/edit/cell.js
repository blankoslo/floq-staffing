import React from 'react';

const EditProjectCell = (props) => (
  <td colSpan={7}>
    {props.value}
  </td>
);

EditProjectCell.propTypes = {
  value: React.PropTypes.number.isRequired
};

export default EditProjectCell;
