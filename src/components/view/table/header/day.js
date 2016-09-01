// @flow
import React from 'react';

const StaffingViewTableHeaderDay = (props : Object) => (
  <th className='small-text half-height no-top-border' title={`${props.dayOfWeek} ${props.date}`} />
);

StaffingViewTableHeaderDay.propTypes = {
  date: React.PropTypes.string.isRequired,
  dayOfWeek: React.PropTypes.string.isRequired,
};

export default StaffingViewTableHeaderDay;
