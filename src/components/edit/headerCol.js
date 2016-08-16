import React from 'react';
import { formatDate } from '../../utils/weekUtil';

const StaffingViewBodyRow = (props) => (
  <th style={{ textAlign: 'center' }}>
    Uke {formatDate(props.startOfWeek)} ({props.sum})
  </th>
);

StaffingViewBodyRow.propTypes = {
  startOfWeek: React.PropTypes.object.isRequired,
  sum: React.PropTypes.number.isRequired
};

export default StaffingViewBodyRow;
