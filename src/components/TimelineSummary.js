import React from 'react';

const TimelineSummaryRow = (props) => (
  <div className='timeline-summary-row'>
    <div className='timeline-summary-key'>
      <div className='timeline-summary-label'>
        Test
      </div>
    </div>
    <div className='timeline-summary-values'>
      <div className='timeline-summary-weeks'>
        { props.weeks.entrySeq().map(([k, v]) =>
          (
            <div
              key={`week-${k}`}
              className='timeline-summary-week'
              style={{ width: `${v * 100}%` }}
            >
              {Math.round(v * 100)}%
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

TimelineSummaryRow.propTypes = {
  weeks: React.PropTypes.object.isRequired
};

const TimelineSummary = (props) => (
  <div>
    <TimelineSummaryRow
      weeks={props.weeks}
    />
    <TimelineSummaryRow
      weeks={props.weeks}
    />
    <TimelineSummaryRow
      weeks={props.weeks}
    />
  </div>
);

TimelineSummary.propTypes = {
  weeks: React.PropTypes.object.isRequired
};

export default TimelineSummary;
