import React from 'react';
import Cell from './cell';

const TableFooter = (props) => (
  <tfoot>
    <tr className='summary-info'>
      <td className='mdl-data-table__cell--non-numeric first-col'>
        Faktureringsgrad
      </td>
      {props.data.map((w, index) =>
        <Cell staffed={w.staffed} staffable={w.staffable} key={index} />)}
    </tr>
  </tfoot>
);

TableFooter.propTypes = {
  data: React.PropTypes.object,
};

export default TableFooter;
