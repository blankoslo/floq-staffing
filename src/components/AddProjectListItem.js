import React from 'react';

const addProject = (func, projectId) =>
  () => func(projectId);

const StaffingEditProjectListItem = (props) => (
  <li className='mdl-list__item project-list'>
    <span onClick={addProject(props.addProject, props.projectId)}>
      <b>{props.customerName}:</b> {props.projectName}
    </span>
  </li>
);

StaffingEditProjectListItem.propTypes = {
  projectId: React.PropTypes.string.isRequired,
  projectName: React.PropTypes.string.isRequired,
  customerName: React.PropTypes.string.isRequired,
  addProject: React.PropTypes.func.isRequired
};

export default StaffingEditProjectListItem;
