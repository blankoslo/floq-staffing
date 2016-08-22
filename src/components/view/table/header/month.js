import React from 'react';

const StaffingViewTableHeaderMonth = (props) => (
  <th colSpan={props.colspan} style={{ textAlign: 'center' }}>
    {props.month}
  </th>
);

StaffingViewTableHeaderMonth.propTypes = {
  month: React.PropTypes.string.isRequired,
  colspan: React.PropTypes.number.isRequired,
};

export default StaffingViewTableHeaderMonth;
