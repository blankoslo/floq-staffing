import React from 'react';
import Col from './headerCol';


const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <td>Ansatte</td>
      {props.weeks.map(w => <Col week={w.week} totalPercent={99} key={w.week} />)}
    </tr>
  </thead>
);

StaffingViewHeader.propTypes = {
  weeks: React.PropTypes.array.isRequired,
};

export default StaffingViewHeader;
