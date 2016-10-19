// @flow
import React from 'react';

const StaffingViewTableHeaderFilters = (props : Object) => (
  <th rowSpan={props.rowspan} className={'first-col'} />
);

StaffingViewTableHeaderFilters.propTypes = {
  rowspan: React.PropTypes.number.isRequired,
};

export default StaffingViewTableHeaderFilters;
