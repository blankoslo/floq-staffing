import React from 'react';

const TableFooterCell = (props) => (
  <td
    colSpan={props.colspan}
    className='mdl-data-table__cell--non-numeric'
    style={{ color: 'black' }}
  >
    {props.value}
  </td>
);

TableFooterCell.propTypes = {
  value: React.PropTypes.string.isRequired,
  colspan: React.PropTypes.number.isRequired,
};

export default TableFooterCell;
