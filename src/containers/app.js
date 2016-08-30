import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, getProjects, getHolidays,
  selectStartOfWeek, selectWeekSpan } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);

    // Selects from database
    props.getEmployees();
    props.getProjects();
    props.getHolidays();

    // Selects from URL
    props.selectStartOfWeek(props.location.query.start_of_week);
    props.selectWeekSpan(props.location.query.week_span);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.start_of_week !== this.props.location.query.start_of_week) {
      nextProps.selectStartOfWeek(nextProps.location.query.start_of_week);
    }
    if (nextProps.location.query.week_span !== this.props.location.query.week_span) {
      nextProps.selectWeekSpan(nextProps.location.query.week_span);
    }
  }
  render() {
    if (this.props.employees.loading ||
        this.props.projects.loading ||
        this.props.holidays.loading ||
        this.props.selectedStartOfWeek === null ||
        this.props.selectedWeekSpan === null) {
      return null;
    }

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,

  // mapStateToProps (So that we can force that these are loaded before rendering tree)
  employees: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  holidays: React.PropTypes.object.isRequired,
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapDispatchToProps
  getEmployees: React.PropTypes.func.isRequired,
  getProjects: React.PropTypes.func.isRequired,
  getHolidays: React.PropTypes.func.isRequired,
  selectStartOfWeek: React.PropTypes.func.isRequired,
  selectWeekSpan: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  employees: state.employees,
  projects: state.projects,
  holidays: state.holidays,
  selectedStartOfWeek: state.selected_start_of_week,
  selectedWeekSpan: state.selected_week_span,
});

const mapDispatchToProps = {
  getEmployees,
  getProjects,
  getHolidays,
  selectStartOfWeek,
  selectWeekSpan,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
