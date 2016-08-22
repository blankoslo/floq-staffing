import React from 'react';
import Week from './week';

const StaffingViewTableHeaderWeeks = (props) => (
  <tr>
    {props.weeks.map((w, index) =>
      <Week weeknumber={w.weeknumber} key={index} first={w.first} last={w.last} />)}
  </tr>
);

StaffingViewTableHeaderWeeks.propTypes = {
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewTableHeaderWeeks;
