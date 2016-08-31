import React from 'react';

const TableFooterCell = (props) => (
  <td
    colSpan={7}
    className='mdl-data-table__cell--non-numeric'
    style={{ color: 'black' }}
    title={`${props.staffed} / ${props.staffable}`}
  >
    {Math.round((props.staffed / props.staffable) * 100)}%
  </td>
);

TableFooterCell.propTypes = {
  staffed: React.PropTypes.number.isRequired,
  staffable: React.PropTypes.number.isRequired,
};

export default TableFooterCell;
