import React from 'react';
import StaffingViewTable from './table/index';

const StaffingView = (props) => (
  <div className='mdl-layout mdl-js-layout'>
    <main className='mdl-layout__content mdl-layout__content--horizontal-scroll'>
      <StaffingViewTable
        header={props.tableHeader}
        body={props.tableBody}
        footer={props.tableFooter}
        edit={props.edit}
      />
    </main>
  </div>
);

StaffingView.propTypes = {
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,
  tableFooter: React.PropTypes.object.isRequired,
  edit: React.PropTypes.object,
};

export default StaffingView;
