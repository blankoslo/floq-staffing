// @flow
import React from 'react';

const StaffingViewTableHeaderDay = (props : Object) => {
  const eventName = props.holiday ? props.holiday : 'HELG';
  const weekendOrHolidayClassName = props.holiday ? 'holiday' : 'weekend';
  const eventNameText = props.weekend || props.holiday ? ` (${eventName})` : '';
  const eventNameClassName = eventNameText ? weekendOrHolidayClassName : '';
  return (
    <th
      className={`small-text half-height no-top-border ${eventNameClassName}`}
      title={`${props.dayOfWeek} ${props.date}${eventNameText}`}
    />
  );
};

StaffingViewTableHeaderDay.propTypes = {
  date: React.PropTypes.string.isRequired,
  dayOfWeek: React.PropTypes.string.isRequired,
  weekend: React.PropTypes.bool.isRequired,
  holiday: React.PropTypes.string,
};

export default StaffingViewTableHeaderDay;
