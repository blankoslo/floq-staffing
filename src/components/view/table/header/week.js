// @flow
import React from 'react';

const StaffingViewTableHeaderWeek = (props : Object) => (
  <th
    colSpan={7}
    className={'week-header-col half-height no-bottom-border'}
    title={`${props.first} - ${props.last}`}
  >
    {props.weeknumber}
  </th>
);

StaffingViewTableHeaderWeek.propTypes = {
  first: React.PropTypes.string.isRequired,
  last: React.PropTypes.string.isRequired,
  weeknumber: React.PropTypes.string.isRequired,
};

export default StaffingViewTableHeaderWeek;
