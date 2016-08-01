import React from 'react';

const StaffingViewBodyRow = (props) => (
  <th>
    Uke {props.week} ({props.totalPercent}%)
  </th>
);

StaffingViewBodyRow.propTypes = {
  week: React.PropTypes.number.isRequired,
  totalPercent: React.PropTypes.number.isRequired
};

export default StaffingViewBodyRow;
