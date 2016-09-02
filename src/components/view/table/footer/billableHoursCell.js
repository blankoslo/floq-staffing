import React from 'react';

const TableFooterCell = (props) => {
  const staffedHours = props.staffed * 7.5;
  return (
    <td
      colSpan={7}
      style={{ color: 'black' }}
      title={`${staffedHours}`}
    >
      {staffedHours}
    </td>
  );
};

TableFooterCell.propTypes = {
  staffed: React.PropTypes.number.isRequired
};

export default TableFooterCell;
