// @flow
import React from 'react';
import { Link } from 'react-router';

const StaffingViewHeaderNavigation = (props : Object) => (
  <td style={{ textAlign: 'center' }} colSpan={props.colspan}>
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--1-col'>
        <Link
          className='mdl-button mdl-js-button'
          to={props.previousPathname}
        >
          <i className='material-icons'>arrow_back</i>
        </Link>
      </div>
      <div className='mdl-cell mdl-cell--10-col' />
      <div className='mdl-cell mdl-cell--1-col'>
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
