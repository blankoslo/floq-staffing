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
    <StaffingViewTable header={props.tableHeader} body={props.tableBody} />
  </div>
);

StaffingView.propTypes = {
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,
  selectedYear: React.PropTypes.number.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired
};

export default StaffingView;
