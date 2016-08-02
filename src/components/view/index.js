import React from 'react';
import StaffingViewTitle from './title';
import StaffingViewTable from './table';

const StaffingView = (props) => (
  <div>
    <StaffingViewTitle
      selectedYear={props.selectedYear}
      onBackClick={props.onBackClick}
      onForwardClick={props.onForwardClick}
    />
    <StaffingViewTable weeks={props.weeks} employees={props.employees} />
  </div>
);

StaffingView.propTypes = {
  employees: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.object.isRequired,
  selectedYear: React.PropTypes.number.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired
};

export default StaffingView;
