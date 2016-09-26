import React from 'react';

const TableFooterCell = (props) => {
  const fraction = `${props.staffed} / ${props.staffable}`;
  return (
    <td
      colSpan={7}
      style={{ color: 'black' }}
      title={`${props.staffed} / ${props.staffable}`}
    >
      {fraction}
    </td>
  );
};

TableFooterCell.propTypes = {
  staffed: React.PropTypes.number.isRequired,
  staffable: React.PropTypes.number.isRequired,
};

export default TableFooterCell;
