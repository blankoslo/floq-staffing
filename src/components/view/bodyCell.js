import React from 'react';

const StaffingViewBodyCell = (props) => (
  <td>
    {props.value}
  </td>
);

StaffingViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
};

export default StaffingViewBodyCell;
