import React from 'react';
import AddProjectDialog from './addProjectDialog';

const AddProjectRow = () => (
  <tr rowSpan={2} >
    <td />
    <td colSpan={20 * 7}>
      <AddProjectDialog />
    </td>
  </tr>
);

export default AddProjectRow;
