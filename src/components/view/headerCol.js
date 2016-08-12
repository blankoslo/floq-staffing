import React from 'react';
import { formatDate } from '../../utils/weekUtil';

const StaffingViewBodyRow = (props) => (
  <th>
    Uke {formatDate(props.startOfWeek)} ({props.sum} / {props.staffable})
  </th>
);

StaffingViewBodyRow.propTypes = {
  startOfWeek: React.PropTypes.object.isRequired,
  sum: React.PropTypes.number.isRequired,
  staffable: React.PropTypes.number.isRequired,
};

export default StaffingViewBodyRow;
