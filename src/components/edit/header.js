import React from 'react';
import Col from './headerCol';


const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <th className='mdl-data-table__cell--non-numeric'>Prosjekter</th>
      {props.header.map((row, index) =>
        <Col
          startOfWeek={row.startOfWeek}
          sum={row.sum}
          key={index}
        />)}
    </tr>
  </thead>
);

StaffingViewHeader.propTypes = {
  header: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
