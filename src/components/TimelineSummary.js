import React from 'react';

const TimelineSummaryRow = (props) => (
  <div className='timeline-summary-row'>
    <div className='timeline-summary-key'>
      <div className='timeline-summary-label'>
        {props.label}
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
              {props.summaryData.get(k, 0)}
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

TimelineSummaryRow.propTypes = {
  label: React.PropTypes.string.isRequired,
  weeks: React.PropTypes.object.isRequired,
  summaryData: React.PropTypes.object.isRequired
};

const getStaffedPercentage = ({ totalStaffedDays, totalAvailableDays }) =>
  Math.round((totalStaffedDays / totalAvailableDays) * 1000) / 10;

const TimelineSummary = (props) => (
  <div>
    <TimelineSummaryRow
      label='Available hours'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => x.totalAvailableDays * 7.5)}
    />
    <TimelineSummaryRow
      label='Staffed hours'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => x.totalStaffedDays * 7.5)}
    />
    <TimelineSummaryRow
      label='Staffed percentage'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => `${getStaffedPercentage(x)}%`)}
    />
  </div>
);

TimelineSummary.propTypes = {
  weeks: React.PropTypes.object.isRequired,
  summaryPerWeek: React.PropTypes.object.isRequired
};

export default TimelineSummary;
