// @flow
import React from 'react';
import Navigation from './navigation';
import Filters from './filters';
import Year from './year';
import Months from './months';
import Weeks from './weeks';
import Days from './days';

const StaffingViewHeader = (props : Object) => (
  <thead>
    <tr>
      <Filters rowspan={5} />
      <Navigation
        colspan={props.header.days.size}
        previousPathname={props.header.previousStartOfWeek}
        nextPathname={props.header.nextStartOfWeek}
      />
    </tr>
    <tr>
    {props.header.years.map((y, index) =>
      <Year colspan={y.colspan} year={y.year} key={index} />
    )}
    </tr>
    <Months months={props.header.months} />
    <Weeks weeks={props.header.weeks} />
    <Days days={props.header.days} />
  </thead>
);

StaffingViewHeader.propTypes = {
  header: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
