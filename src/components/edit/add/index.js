import React from 'react';
import AddProjectDialog from './addProjectDialog';

const AddProjectRow = () => (
  <tr rowSpan={2} >
    <td />
    <td colSpan={20 * 7} style={{ textAlign: 'left' }}>
      <AddProjectDialog />
    </td>
  </tr>
);

export default AddProjectRow;
