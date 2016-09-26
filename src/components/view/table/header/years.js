// @flow
import React from 'react';
import Year from './year';

const StaffingViewTableHeaderYears = (props : Object) => (
  `${props.years.map((y, index) =>
    <Year colspan={y.colspan} year={y.year} key={index} />
  )}`
);

StaffingViewTableHeaderYears.propTypes = {
  years: React.PropTypes.object.isRequired,
};

export default StaffingViewTableHeaderYears;
