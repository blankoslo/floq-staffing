import React from 'react';

const StaffingViewHeaderNavigation = (props) => (
  <td style={{ textAlign: 'center' }} colSpan={props.colspan}>
    <div className='mdl-grid'>
      <div className='mdl-cell mdl-cell--1-col'>
        <button
          className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
            mdl-js-ripple-effect mdl-button--colored'
          onClick={props.onBackClick}
        >
          <i className='material-icons'>arrow_back</i>
        </button>
      </div>
      <div className='mdl-cell mdl-cell--10-col'>

      </div>
      <div className='mdl-cell mdl-cell--1-col'>
        <button
          className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
            mdl-js-ripple-effect mdl-button--colored'
          onClick={props.onForwardClick}
        >
          <i className='material-icons'>arrow_forward</i>
        </button>
      </div>
    </div>
  </td>
);

StaffingViewHeaderNavigation.propTypes = {
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired,
  colspan: React.PropTypes.number.isRequired
};

export default StaffingViewHeaderNavigation;
