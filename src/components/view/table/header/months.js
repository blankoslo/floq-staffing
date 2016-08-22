import React from 'react';
import Month from './month';

const StaffingViewTableHeaderMonths = (props) => (
  <tr>
    {props.months.map((m, index) =>
      <Month colspan={m.colspan} month={m.month} key={index} />
    )}
  </tr>
);

StaffingViewTableHeaderMonths.propTypes = {
  months: React.PropTypes.object.isRequired,
};

export default StaffingViewTableHeaderMonths;
