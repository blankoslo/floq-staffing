// @flow
import React from 'react';

const StaffingViewTableHeaderFilters = (props : Object) => (
  <th rowSpan={props.rowspan} className={'first-col'}>
    <ul className='mdl-list'>
      <li className='mdl-list__item'>
        <label
          className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
          htmlFor='filter-checkbox-1'
        >
          <input
            type='checkbox'
            style={{ width: '20px' }}
            id='filer-checkbox-1'
            disabled
            className='mdl-checkbox__input'
          />
          <span className='mdl-checkbox__label'>Kun med ledig tid</span>
        </label>
      </li>
      <li className='mdl-list__item'>
        <label
          className='mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect'
          htmlFor='filter-checkbox-2'
        >
          <input
            type='checkbox'
            style={{ width: '20px' }}
            id='filer-checkbox-2'
            disabled
            className='mdl-checkbox__input'
          />
          <span className='mdl-checkbox__label'>Annet filter</span>
        </label>
      </li>
    </ul>
  </th>
);

StaffingViewTableHeaderFilters.propTypes = {
  rowspan: React.PropTypes.number.isRequired,
};

export default StaffingViewTableHeaderFilters;
