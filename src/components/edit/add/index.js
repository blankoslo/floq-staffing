import React from 'react';

const AddProjectRow = () => (
  <tr rowSpan={2} >
    <td />
    <td colSpan={20 * 7}>
      <button
        className='mdl-button mdl-js-button mdl-button--fab'
        onClick={() => {}}
      >
        <i className='material-icons'>add</i>
      </button>
    </td>
  </tr>
);

export default AddProjectRow;
