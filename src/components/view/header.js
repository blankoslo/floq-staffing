import React from 'react';
import Col from './headerCol';


const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <th className='mdl-data-table__cell--non-numeric'>Ansatte</th>
      {props.weeks.map(w => <Col week={w.week} totalPercent={99} key={w.week} />)}
    </tr>
  </thead>
);

StaffingViewHeader.propTypes = {
  weeks: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
