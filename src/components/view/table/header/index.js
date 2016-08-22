import React from 'react';
import Navigation from './navigation';
import Filters from './filters';
import Year from './year';
import Months from './months';
import Weeks from './weeks';
import Days from './days';

const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <Filters rowspan={5} />
      <Navigation
        colspan={13 * 7}
        onBackClick={props.header.onBackClick}
        onForwardClick={props.header.onForwardClick}
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
