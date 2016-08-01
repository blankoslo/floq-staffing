import React from 'react';

const StaffingViewBodyRow = (props) => (
  <td>
    Uke {props.week} ({props.totalPercent}%)
  </td>
);

StaffingViewBodyRow.propTypes = {
  week: React.PropTypes.number.isRequired,
  totalPercent: React.PropTypes.number.isRequired
};

export default StaffingViewBodyRow;
