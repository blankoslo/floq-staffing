import React from 'react';
import Header from './header/index';
import ViewOnly from './body/viewOnly';
import FirstPart from './body/firstPart';
import LastPart from './body/lastPart';

const classes = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp staffing-view-table';
const viewOnly = (header, employees, selectedStartOfWeek) => (
  <table className={classes}>
    <Header header={header} />
    <ViewOnly
      employees={employees}
      selectedStartOfWeek={selectedStartOfWeek}
    />
  </table>
);

const viewAndEdit = (header, employees, selectedEmployee, selectedStartOfWeek, edit) => (
  <table className={classes}>
    <Header header={header} />
    <FirstPart
      employees={employees}
      selectedEmployee={selectedEmployee}
      selectedStartOfWeek={selectedStartOfWeek}
    />
    {edit}
    <LastPart
      employees={employees}
      selectedEmployee={selectedEmployee}
      selectedStartOfWeek={selectedStartOfWeek}
    />
  </table>
);

const StaffingViewTable = (props) => {
  const selectedStartOfWeek = props.body.selectedStartOfWeek;
  const header = props.header;
  const employees = props.body.employees;
  const employeeId = props.body.selectedEmployee === null ? null : props.body.selectedEmployee.id;
  return props.edit === null ? viewOnly(header, employees, selectedStartOfWeek) :
    viewAndEdit(header, employees, employeeId, selectedStartOfWeek, props.edit);
};

StaffingViewTable.propTypes = {
  header: React.PropTypes.object.isRequired,
  body: React.PropTypes.object.isRequired,
  edit: React.PropTypes.object,
};

export default StaffingViewTable;
