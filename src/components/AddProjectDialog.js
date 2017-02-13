import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';

import { addProject } from '../actions/index';

import AddProjectListItem from './AddProjectListItem';

class AddProjectDialog extends Component {
  state = {
    open: false
  };

  addProject = (projectId) => {
    this.props.addProject(this.props.employeeId, projectId);
    this.handleClose();
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <button
          className='mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab'
          onClick={this.handleOpen}
        >
          <i className='material-icons'>add</i>
        </button>
        <Dialog
          title='Legg til prosjekt'
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent
        >
          <div className='mdl-layout__content'>
            <ul className='mdl-list'>
              {
                this.props.projects.data.toIndexedSeq().map(p =>
                  <AddProjectListItem
                    projectId={p.id}
                    projectName={p.name}
                    customerName={p.id}
                    addProject={this.addProject}
                    key={p.id}
                  />
              )}
            </ul>
          </div>
          <button onClick={this.handleClose} style={{ textAlign: 'right' }}>
            Lukk
          </button>
        </Dialog>
      </div>
    );
  }
}

AddProjectDialog.propTypes = {
  employeeId: React.PropTypes.number.isRequired,
  addProject: React.PropTypes.func.isRequired,
  projects: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  projects: state.projects
});

const mapDispatchToProps = {
  addProject
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProjectDialog);
