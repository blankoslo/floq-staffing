import React from 'react';
import Header from './header';
import ViewOnly from './body/viewOnly';
import FirstPart from './body/firstPart';
import LastPart from './body/lastPart';
import Footer from './footer';

const classes = 'mdl-data-table mdl-js-data-table mdl-shadow--2dp staffing-view-table';
const viewOnly = (header, footer, employees, selectedStartOfWeek) => (
  <table className={classes}>
    <Header header={header} />
    <ViewOnly
      employees={employees}
      selectedStartOfWeek={selectedStartOfWeek}
    />
    <Footer data={footer} />
  </table>
);

const viewAndEdit = (header, footer, employees, selectedEmployee, selectedStartOfWeek, edit) => (
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
    <Footer data={footer} />
  </table>
);

const StaffingViewTable = (props) => {
  const selectedStartOfWeek = props.body.selectedStartOfWeek;
  const header = props.header;
  const footer = props.footer;
  const employees = props.body.employees;
  const employeeId = props.body.selectedEmployee === null ? null : props.body.selectedEmployee.id;
  return props.edit === null ? viewOnly(header, footer, employees, selectedStartOfWeek) :
    viewAndEdit(header, footer, employees, employeeId, selectedStartOfWeek, props.edit);
};

StaffingViewTable.propTypes = {
  header: React.PropTypes.object.isRequired,
  body: React.PropTypes.object.isRequired,
  footer: React.PropTypes.object.isRequired,
  edit: React.PropTypes.object,
};

export default StaffingViewTable;
