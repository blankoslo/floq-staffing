import React from 'react';

const StaffingViewTitle = (props) => (
  <div style={{ textAlign: 'center' }}>
    <h1>Alle</h1>
    <h2>{props.selectedYear}</h2>
  </div>
);

StaffingViewTitle.propTypes = {
  selectedYear: React.PropTypes.number.isRequired
};

export default StaffingViewTitle;
