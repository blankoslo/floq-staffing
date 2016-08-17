import React from 'react';

const StaffingViewTitle = (props) => (
  <div style={{ textAlign: 'center' }}>
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
        <h2>{props.selectedYear}</h2>
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
  </div>
);

StaffingViewTitle.propTypes = {
  selectedYear: React.PropTypes.number.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired
};

export default StaffingViewTitle;
