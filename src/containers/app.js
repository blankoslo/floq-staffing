import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getProjects, getStaffing, selectYear, selectWeek } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getEmployees();
    props.getProjects();
    props.getStaffing();

    props.selectYear(props.location.query.year);
    props.selectWeek(props.location.query.week);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.year !== this.props.location.query.year) {
      this.props.selectYear(nextProps.location.query.year);
    }
    if (nextProps.location.query.week !== this.props.location.query.week) {
      this.props.selectWeek(nextProps.location.query.week);
    }
  }
  render() {
    if (this.props.employees.loading ||
        this.props.staffing.loading ||
        this.props.projects.loading) {
      return null;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        projects: this.props.projects,
        staffing: this.props.staffing,
        selectedYear: this.props.selectedYear,
        selectedWeek: this.props.selectedWeek
      }));

    return (
      <div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,

  // mapStateToProps
  employees: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  staffing: React.PropTypes.object.isRequired,
  selectedYear: React.PropTypes.number.isRequired,
  selectedWeek: React.PropTypes.number.isRequired,

  // mapDispatchToProps
  getEmployees: React.PropTypes.func.isRequired,
  getProjects: React.PropTypes.func.isRequired,
  getStaffing: React.PropTypes.func.isRequired,
  selectYear: React.PropTypes.func.isRequired,
  selectWeek: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  projects: state.projects,
  staffing: state.staffing,
  selectedYear: state.selected_year,
  selectedWeek: state.selected_week
});

const mapDispatchToProps = {
  getEmployees,
  getProjects,
  getStaffing,
  selectYear,
  selectWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
