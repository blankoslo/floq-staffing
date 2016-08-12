import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getProjects, getStaffing,
  selectStartOfWeek, selectWeekSpan } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    props.getEmployees();
    props.getProjects();
    props.getStaffing();

    props.selectStartOfWeek(props.location.query.start_of_week);
    props.selectWeekSpan(props.location.query.week_span);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.start_of_week !== this.props.location.query.start_of_week) {
      this.props.selectStartOfWeek(nextProps.location.query.start_of_week);
    }
    if (nextProps.location.query.week_span !== this.props.location.query.week_span) {
      this.props.selectWeekSpan(nextProps.location.query.week_span);
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
        selectedStartOfWeek: this.props.selectedStartOfWeek,
        selectedWeekSpan: this.props.selectedWeekSpan
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
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapDispatchToProps
  getEmployees: React.PropTypes.func.isRequired,
  getProjects: React.PropTypes.func.isRequired,
  getStaffing: React.PropTypes.func.isRequired,
  selectStartOfWeek: React.PropTypes.func.isRequired,
  selectWeekSpan: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  projects: state.projects,
  staffing: state.staffing,
  selectedStartOfWeek: state.selected_start_of_week,
  selectedWeekSpan: state.selected_week_span,
});

const mapDispatchToProps = {
  getEmployees,
  getProjects,
  getStaffing,
  selectStartOfWeek,
  selectWeekSpan
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
