import React from 'react';

const TableFooterCell = (props) => {
  const pct = Math.round((props.staffed / props.staffable) * 100);
  const bg = `rgb(${100 - pct}%, ${pct}%, 0%)`;
  return (
    <td
      colSpan={7}
      className='mdl-data-table__cell--non-numeric'
      style={{ color: 'black', backgroundColor: `${bg}` }}
      title={`${props.staffed} / ${props.staffable}`}
    >
      {pct}%
    </td>
  );
};

TableFooterCell.propTypes = {
  staffed: React.PropTypes.number.isRequired,
  staffable: React.PropTypes.number.isRequired,
};

export default TableFooterCell;
