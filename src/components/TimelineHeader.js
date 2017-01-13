import React from 'react';
import dateFns from 'date-fns';

const TimelineHeader = (props) => {
  const weekDays = props.days.groupBy(dateFns.getISOWeek);
  return (
    <div className='timeline-header'>
      <div className='timeline-header-months'>
        { props.months.entrySeq().map(([k, v]) =>
          (
            <div
              key={`month-${k}`}
              className='timeline-header-month'
              style={{ width: `calc(${v * 100}%)` }}
            >
              {k}
            </div>
          ))
        }
      </div>
      <div className='timeline-header-weeks'>
        { props.weeks.entrySeq().map(([k, v]) =>
          (
            <div
              key={`week-${k}`}
              className='timeline-header-week'
              style={{ width: `calc(${v * 100}%)` }}
            >
              {k}
              <div className='timeline-header-days'>
                { weekDays.get(k).map((x) =>
                  (
                    <div
                      key={`day-${dateFns.format(x, 'YYYY-M-D')}`}
                      className='timeline-header-day'
                      title={dateFns.format(x, 'YYYY-M-D')}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

TimelineHeader.propTypes = {
  days: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.object.isRequired,
  months: React.PropTypes.object.isRequired
};

export default TimelineHeader;
