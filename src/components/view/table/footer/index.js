import React from 'react';
import Cell from './cell';

const TableFooter = () => (
  <tfoot>
    <tr>
      <td className='mdl-data-table__cell--non-numeric first-col'>
        Sammendrag
      </td>
      <Cell value={'0 / 0'} colspan={7} />
    </tr>
  </tfoot>
);

TableFooter.propTypes = {
  data: React.PropTypes.object,
};

export default TableFooter;
