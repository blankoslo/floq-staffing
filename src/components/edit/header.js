import React from 'react';
import Col from './headerCol';
import { formatDate } from '../../utils/weekUtil';

const StaffingViewHeader = (props) => (
  <thead>
    <tr>
      <th className='mdl-data-table__cell--non-numeric'>Prosjekter</th>
      {props.header.map(row =>
        <Col
          startOfWeek={row.startOfWeek}
          sum={row.sum}
          key={`header-${formatDate(row.startOfWeek)}`}
        />)}
    </tr>
  </thead>
);

StaffingViewHeader.propTypes = {
  header: React.PropTypes.object.isRequired,
};

export default StaffingViewHeader;
