import React from 'react';
import Header from './header';
import Body from './body';

const StaffingViewTable = (props) => (
  <div>
    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
      <Header id='staffing-view-table-header' header={props.header} />
      <Body id='staffing-view-table-body' body={props.body} />
    </table>
  </div>
);

StaffingViewTable.propTypes = {
  header: React.PropTypes.object.isRequired,
  body: React.PropTypes.object.isRequired
};

export default StaffingViewTable;
