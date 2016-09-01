import React from 'react';
import BillablePercentageCell from './billablePercentageCell.js';
import BillableFractionCell from './billableFractionCell.js';
import BillableHoursCell from './billableHoursCell.js';

const TableFooter = (props) => (
  <tfoot className='summary-info'>
    <tr>
      <td className='mdl-data-table__cell--non-numeric first-col'>
        Faktureringsgrad
      </td>
      {props.data.map((w, index) =>
        <BillablePercentageCell staffed={w.staffed} staffable={w.staffable} key={index} />)}
    </tr>
    <tr>
      <td className='mdl-data-table__cell--non-numeric first-col'>
        Fakturerbare dager
      </td>
      {props.data.map((w, index) =>
        <BillableFractionCell staffed={w.staffed} staffable={w.staffable} key={index} />)}
    </tr>
    <tr>
      <td className='mdl-data-table__cell--non-numeric first-col'>
        Fakturerbare timer
      </td>
      {props.data.map((w, index) =>
        <BillableHoursCell staffed={w.staffed} key={index} />)}
    </tr>
  </tfoot>
);

TableFooter.propTypes = {
  data: React.PropTypes.object,
};

export default TableFooter;
