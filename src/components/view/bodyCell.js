import React from 'react';

const StaffingViewBodyCell = (props) => (
  <td style={{ color: props.textColor, fontWeight: props.fontWeight }}>
    {props.value}%
  </td>
);

StaffingViewBodyCell.propTypes = {
  value: React.PropTypes.number.isRequired,
  textColor: React.PropTypes.string.isRequired,
  fontWeight: React.PropTypes.string.isRequired
};

export default StaffingViewBodyCell;
