import React from 'react';
import Header from './header';
import Body from './body';

const StaffingViewTable = (props) => (
  <div>
    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
      <Header id='staffing-view-table-header' header={props.tableHeader} />
      <Body id='staffing-view-table-body' body={props.tableBody} />
    </table>
  </div>
);

StaffingViewTable.propTypes = {
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired
};

export default StaffingViewTable;
