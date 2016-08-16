import React from 'react';

const StaffingEditTitle = (props) => (
  <div style={{ textAlign: 'center' }}>
    <h1>{props.employeeName}</h1>
    <h2>{props.selectedYear}</h2>
    <span>
      <button
        className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
          mdl-js-ripple-effect mdl-button--colored'
        onClick={props.onBackClick}
      >
        <i className='material-icons'>arrow_back</i>
      </button>
      <h2 style={{ display: 'inline-block' }}>Uke</h2>
      <button
        className='mdl-button mdl-js-button mdl-button--fab  mdl-button--icon
          mdl-js-ripple-effect mdl-button--colored'
        onClick={props.onForwardClick}
      >
        <i className='material-icons'>arrow_forward</i>
      </button>
    </span>
  </div>
);

StaffingEditTitle.propTypes = {
  employeeName: React.PropTypes.string.isRequired,
  selectedYear: React.PropTypes.number.isRequired,
  onBackClick: React.PropTypes.func.isRequired,
  onForwardClick: React.PropTypes.func.isRequired
};

export default StaffingEditTitle;
