// @flow
import React from 'react';

const StaffingViewTableHeaderDay = (props : Object) => {
  // Check if weekend or holiday. Weekend is checked here on client side.
  const isWeekend = props.dayOfWeek === 'Sat' || props.dayOfWeek === 'Sun';
  let eventName = isWeekend ? 'HELG' : '';
  eventName = props.holiday ? props.holiday : eventName;

  // Holiday takes priority over weekend.
  const weekendOrHoliday = props.holiday ? 'holiday' : 'weekend';
  const holiday = eventName ? ` (${eventName})` : '';
  return (
    <th
      className={`small-text half-height no-top-border ${holiday ? weekendOrHoliday : ''}`}
      title={`${props.dayOfWeek} ${props.date}${holiday}`}
    />
  );
};

StaffingViewTableHeaderDay.propTypes = {
  date: React.PropTypes.string.isRequired,
  dayOfWeek: React.PropTypes.string.isRequired,
  holiday: React.PropTypes.string.isRequired,
};

export default StaffingViewTableHeaderDay;
