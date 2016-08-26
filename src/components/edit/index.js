import React from 'react';
import AddProjectRow from './add/index';
import EditRow from './row';

const EditBody = (props) => (
  <tbody>
    {props.data.projects.map(project =>
      <EditRow
        project={project}
        onClick={props.data.onClick}
        onChange={props.data.onChange}
        key={`edit-row-${project.id}`}
      />
    )}
    <AddProjectRow />
  </tbody>
);

EditBody.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default EditBody;
