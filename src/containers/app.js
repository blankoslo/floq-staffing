import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getProjects, getStaffing } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getEmployees();
    this.props.getProjects();
    this.props.getStaffing();
  }

  render() {
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employees: this.props.employees,
        projects: this.props.projects,
        staffing: this.props.staffing
      }));

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,

  // mapStateToProps
  employees: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  staffing: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getEmployees: React.PropTypes.func.isRequired,
  getProjects: React.PropTypes.func.isRequired,
  getStaffing: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  projects: state.projects,
  staffing: state.staffing
});

const mapDispatchToProps = {
  getEmployees,
  getProjects,
  getStaffing
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
