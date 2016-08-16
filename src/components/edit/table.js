import React from 'react';
import Header from './header';
import Body from './body';

const StaffingEditTable = (props) => (
  <div>
    <table className='mdl-data-table mdl-js-data-table mdl-shadow--2dp'>
      <Header id='staffing-edit-table-header' header={props.header} />
      <Body id='staffing-edit-table-body' body={props.body} onChange={props.onChange} />
    </table>
  </div>
);

StaffingEditTable.propTypes = {
  header: React.PropTypes.object.isRequired,
  body: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default StaffingEditTable;
