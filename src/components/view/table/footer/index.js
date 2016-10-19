import React from 'react';
import AvailableHoursCell from './availableHoursCell';
import BillableHoursCell from './billableHoursCell';
import BillablePercentageChart from '../../chart';
import BillablePercentageCell from './billablePercentageCell';

const TableFooter = (props) => {
  let width;
  return (
    <tfoot
      id='summary-info'
      className='summary-info'
      ref={(c) => (width = c ? c.style.offsetWidth : 0)}
    >
      <tr>
        <td className='mdl-data-table__cell--non-numeric first-col'>
          Tilgjengelig timer
        </td>
        {props.data.map((w, index) =>
          <AvailableHoursCell staffable={w.staffable} key={index} />)}
      </tr>
      <tr>
        <td className='mdl-data-table__cell--non-numeric first-col'>
          Fakturerbare timer
        </td>
        {props.data.map((w, index) =>
          <BillableHoursCell staffed={w.staffed} key={index} />)}
      </tr>
      <tr>
        <td className='mdl-data-table__cell--non-numeric first-col'>
          &nbsp;
        </td>
        <td colSpan={(props.data.size * 7)}>
          <BillablePercentageChart data={props.data} width={width} />
        </td>
      </tr>
      <tr>
        <td className='mdl-data-table__cell--non-numeric first-col'>
          Faktureringsgrad
        </td>
        {props.data.map((w, index) =>
          <BillablePercentageCell staffed={w.staffed} staffable={w.staffable} key={index} />)}
      </tr>
    </tfoot>
  );
};

TableFooter.propTypes = {
  data: React.PropTypes.object,
};

export default TableFooter;
