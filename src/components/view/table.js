import React from 'react';
import Header from './header';
import Body from './body';

const StaffingViewTable = (props) => (
  <div>
    <table>
      <Header id='staffing-view-table-header' weeks={props.weeks} />
      <Body id='staffing-view-table-body' employees={props.employees} />
    </table>
  </div>
);

StaffingViewTable.propTypes = {
  employees: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.array.isRequired
};

export default StaffingViewTable;
