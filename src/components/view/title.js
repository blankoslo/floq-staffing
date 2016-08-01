import React from 'react';

const StaffingViewTitle = (props) => (
  <div>
    <h1>{props.selectedYear}</h1>
  </div>
);

StaffingViewTitle.propTypes = {
  selectedYear: React.PropTypes.number.isRequired
};

export default StaffingViewTitle;
