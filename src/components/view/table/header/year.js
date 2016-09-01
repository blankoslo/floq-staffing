import React from 'react';

const StaffingViewTableHeaderYear = (props) => (
  <th colSpan={props.colspan}>
    {props.year}
  </th>
);

StaffingViewTableHeaderYear.propTypes = {
  year: React.PropTypes.string.isRequired,
  colspan: React.PropTypes.number.isRequired,
};

export default StaffingViewTableHeaderYear;
