import React from 'react';
import Col from './headerCol';


const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <th className='mdl-data-table__cell--non-numeric'>Ansatte</th>
      {props.header.map((w, index) =>
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
  header: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
