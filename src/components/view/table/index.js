import React from 'react';
import Header from './header/index';
import Body from './body/index';

const StaffingViewTable = (props) => (
  <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp staffing-view-table'>
    <Header id='staffing-view-table-header' header={props.header} />
    <Body id='staffing-view-table-body' body={props.body} />
  </table>
);

StaffingViewTable.propTypes = {
  header: React.PropTypes.object.isRequired,
  body: React.PropTypes.object.isRequired
};

export default StaffingViewTable;
