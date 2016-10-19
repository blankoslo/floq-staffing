import React from 'react';

const BillableHoursCell = (props) => {
  const staffedHours = props.staffed * 7.5;
  return (
    <td
      colSpan={7}
      style={{ color: 'black' }}
    >
      {staffedHours}
    </td>
  );
};

BillableHoursCell.propTypes = {
  staffed: React.PropTypes.number.isRequired
};

export default BillableHoursCell;
