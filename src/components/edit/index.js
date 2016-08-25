import React from 'react';
import AddProjectRow from './add/index';
import EditRow from './row';

const EditBody = (props) => (
  <tbody>
    {props.data.map(p => <EditRow project={p} key={`edit-row-${p.id}`} />)}
    <AddProjectRow />
  </tbody>
);

EditBody.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default EditBody;
