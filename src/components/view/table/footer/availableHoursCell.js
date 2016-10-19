import React from 'react';

const AvailableHoursCell = (props) => {
  const availableHours = props.staffable * 7.5;
  return (
    <td
      colSpan={7}
      style={{ color: 'black' }}
    >
      {availableHours}
    </td>
  );
};

AvailableHoursCell.propTypes = {
  staffable: React.PropTypes.number.isRequired,
};

export default AvailableHoursCell;
