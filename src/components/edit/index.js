import React from 'react';
import Title from './title';
import Table from './table';

const StaffingEdit = (props) => (
  <div>
    <Title
      employeeName={props.employeeName}
      selectedYear={props.selectedYear}
      onBackClick={props.onBackClick}
      onForwardClick={props.onForwardClick}
      onChange={props.onChange}
    />
    <Table header={props.tableHeader} body={props.tableBody} onChange={props.onChange} />
  </div>
);

StaffingEdit.propTypes = {
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,
  selectedYear: React.PropTypes.number.isRequired,
  employeeName: React.PropTypes.string.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default StaffingEdit;
