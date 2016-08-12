import React from 'react';
import Col from './headerCol';


const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <th className='mdl-data-table__cell--non-numeric'>Ansatte</th>
      {props.weeks.map((w, index) =>
        <Col
          startOfWeek={w.startOfWeek}
          sum={w.sum}
          staffable={w.staffable}
          key={index}
        />)}
    </tr>
  </thead>
);

StaffingViewHeader.propTypes = {
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
