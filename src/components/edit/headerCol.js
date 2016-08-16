import React from 'react';
import { formatDate } from '../../utils/weekUtil';

const StaffingViewBodyRow = (props) => (
  <th style={{ textAlign: 'center', whiteSpace: 'normal' }}>
    <span>Uke </span>
    <span style={{ whiteSpace: 'nowrap' }}>{formatDate(props.startOfWeek)}</span>
    <span> (&nbsp;{props.sum}&nbsp;)</span>
  </th>
);

StaffingViewBodyRow.propTypes = {
  startOfWeek: React.PropTypes.object.isRequired,
  sum: React.PropTypes.number.isRequired
};

export default StaffingViewBodyRow;
