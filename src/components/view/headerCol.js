import React from 'react';

const StaffingViewBodyRow = (props) => (
  <th>
    Uke {props.week} ({props.sum} / {props.available})
  </th>
);

StaffingViewBodyRow.propTypes = {
  week: React.PropTypes.number.isRequired,
  sum: React.PropTypes.number.isRequired,
  available: React.PropTypes.number.isRequired,
};

export default StaffingViewBodyRow;
