import React from 'react';
import StaffingViewTitle from './title';
import StaffingViewTable from './table';

const StaffingView = (props) => (
  <div>
    <StaffingViewTitle selectedYear={props.selectedYear} />
    <StaffingViewTable weeks={props.weeks} employees={props.employees} />
  </div>
);

StaffingView.propTypes = {
  employees: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.array.isRequired,
  selectedYear: React.PropTypes.number.isRequired
};

export default StaffingView;
