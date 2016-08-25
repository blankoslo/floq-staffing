import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import AddProjectListItem from './addProjectListItem';

import { addProject } from '../../actions/index';

class AddProjectDialog extends Component {
  state = {
    open: false
  };

  addProject = (projectId) => {
    this.props.addProject(projectId, this.props.selectedStartOfWeek);
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
      <div>
        <button
          className='mdl-button mdl-js-button mdl-button--raised mdl-button--colored'
          onClick={this.handleOpen}
        >
          Legg til prosjekt
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

const mapStateToProps = (state) => ({
  projects: state.projects,
  selectedStartOfWeek: state.selected_start_of_week
});

AddProjectDialog.propTypes = {
  addProject: React.PropTypes.func.isRequired,
  projects: React.PropTypes.object.isRequired,
  selectedStartOfWeek: React.PropTypes.object.isRequired
};

export default connect(mapStateToProps, { addProject })(AddProjectDialog);
