import React from 'react';

const StaffingViewBodyCell = (props) => (
  <td
    style={{
      color: props.textColor,
      fontWeight: props.fontWeight,
      backgroundColor: props.backgroundColor,
      borderLeft: '1px solid rgba(0,0,0,.12)'
    }}
  >
    {props.value !== null ? `${Math.round(props.value)}%` : null}
  </td>
);

StaffingViewBodyCell.propTypes = {
  value: React.PropTypes.number,
  textColor: React.PropTypes.string.isRequired,
  fontWeight: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.string.isRequired
};

export default StaffingViewBodyCell;
