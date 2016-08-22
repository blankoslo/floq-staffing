import React from 'react';
import Day from './day';

const StaffingViewTableHeaderDays = (props) => (
  <tr>
    {props.days.map((d, index) => <Day key={index} date={d.date} dayOfWeek={d.dayOfWeek} />)}
  </tr>
);

StaffingViewTableHeaderDays.propTypes = {
  days: React.PropTypes.object.isRequired,
};

export default StaffingViewTableHeaderDays;
