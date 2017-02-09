import React from 'react';

import BillablePercentageChart from './BillablePercentageChart';

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

const TimelineSummaryGraph = (props) => (
  <div className='timeline-summary-row'>
    <div className='timeline-summary-key'>
      <div className='timeline-summary-label'>
        {props.label}
      </div>
    </div>
    <div className='timeline-summary-values'>
      <div
        style={{ width: '100%', paddingTop: '1rem' }}
        className='timeline-summary-weeks'
      >
        <BillablePercentageChart
          data={props.data}
        />
      </div>
    </div>
  </div>
);

TimelineSummaryGraph.propTypes = {
  label: React.PropTypes.string.isRequired,
  weeks: React.PropTypes.object.isRequired,
  data: React.PropTypes.object.isRequired
};

const getBillablePercentage = ({ totalBillableDays, totalAvailableDays }) =>
  ((totalBillableDays / totalAvailableDays) * 100).toFixed(1);

const TimelineSummary = (props) => (
  <div>
    <TimelineSummaryRow
      label='Tilgjengelige timer'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => x.totalAvailableDays * 7.5)}
    />
    <TimelineSummaryRow
      label='Bemannede timer'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => x.totalStaffedDays * 7.5)}
    />
    <TimelineSummaryRow
      label='Fakturerbare timer'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => x.totalBillableDays * 7.5)}
    />
    <TimelineSummaryRow
      label='Faktureringsgrad'
      weeks={props.weeks}
      summaryData={props.summaryPerWeek.map((x) => `${getBillablePercentage(x)}%`)}
    />
    <TimelineSummaryGraph
      label=''
      weeks={props.weeks}
      data={props.summaryPerWeek.map((x) => getBillablePercentage(x))}
    />
  </div>
);

TimelineSummary.propTypes = {
  weeks: React.PropTypes.object.isRequired,
  summaryPerWeek: React.PropTypes.object.isRequired
};

export default TimelineSummary;
