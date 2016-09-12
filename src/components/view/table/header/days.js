// @flow
import React from 'react';
import Day from './day';

const StaffingViewTableHeaderDays = (props : Object) => (
  <tr>
    {props.days.map((d) =>
      <Day key={d.date} date={d.date} dayOfWeek={d.dayOfWeek} weekend={d.weekend} holiday={d.holiday} />)}
  </tr>
);

StaffingViewTableHeaderDays.propTypes = {
  days: React.PropTypes.object.isRequired,
};

export default StaffingViewTableHeaderDays;
