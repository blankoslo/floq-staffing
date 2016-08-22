import React from 'react';

const StaffingViewBodyCell = (props) => (
  <td
    colSpan={7}
    style={{
      color: props.textColor,
      fontWeight: props.fontWeight,
      borderLeft: '1px solid rgba(0,0,0,.12)',
      textAlign: 'center'
    }}
  >
    {props.value !== null ? `${Math.round(props.value)}%` : null}
  </td>
);

StaffingViewBodyCell.propTypes = {
  value: React.PropTypes.number,
  textColor: React.PropTypes.string.isRequired,
  fontWeight: React.PropTypes.string.isRequired,
};

export default StaffingViewBodyCell;
