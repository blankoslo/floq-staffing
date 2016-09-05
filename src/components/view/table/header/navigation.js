import React from 'react';
import { Link } from 'react-router';

const StaffingViewHeaderNavigation = (props) => (
  <td style={{ textAlign: 'center' }} colSpan={props.colspan}>
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--6-col' style={{ textAlign: 'left' }}>
        <Link
          className='mdl-button mdl-js-button'
          to={props.previousPathname}
        >
          <i className='material-icons'>arrow_back</i>
        </Link>
      </div>
      <div className='mdl-cell mdl-cell--6-col' style={{ textAlign: 'right' }}>
        <Link
          className='mdl-button mdl-js-button'
          to={props.nextPathname}
        >
          <i className='material-icons'>arrow_forward</i>
        </Link>
      </div>
    </div>
  </td>
);

StaffingViewHeaderNavigation.propTypes = {
  nextPathname: React.PropTypes.string.isRequired,
  previousPathname: React.PropTypes.string.isRequired,
  colspan: React.PropTypes.number.isRequired
};

export default StaffingViewHeaderNavigation;
