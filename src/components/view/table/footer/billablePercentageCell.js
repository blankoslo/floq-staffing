import React from 'react';

const BillablePercentageCell = (props) => {
  const pct = ((props.staffed / props.staffable) * 100).toFixed(1);
  const bg = `rgb(${100 - pct}%, ${pct}%, 0%)`;
  return (
    <td
      colSpan={7}
      style={{ color: 'black', backgroundColor: `${bg}` }}
      title={`${props.staffed * 7.5} / ${props.staffable * 7.5}`}
    >
      {pct}%
    </td>
  );
};

BillablePercentageCell.propTypes = {
  staffed: React.PropTypes.number.isRequired,
  staffable: React.PropTypes.number.isRequired,
};

export default BillablePercentageCell;
