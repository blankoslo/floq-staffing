import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeesSelector from '../selectors/employeesSelector';
import weeksTotalSelector from '../selectors/weeksTotalSelector';
import { getWorkedDaysPerWeek, selectWeek } from '../actions/index';
import StaffingView from '../components/view/index';
import calculateNewYearWeek from '../utils/weekUtil';
import { browserHistory } from 'react-router';

class StaffingViewContainer extends Component {
  constructor(props) {
    super(props);
    props.getWorkedDaysPerWeek(props.selectedYear, props.selectedWeek);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedYear !== nextProps.selectedYear
      || this.props.selectedWeek !== nextProps.selectedWeek) {
      this.props.getWorkedDaysPerWeek(nextProps.selectedYear, nextProps.selectedWeek);
    }
  }

  onBackClick = () => {
    this.changeYearAndWeek(-8);
  };

  onForwardClick = () => {
    this.changeYearAndWeek(8);
  };

  changeYearAndWeek(change) {
    const { year, week } = calculateNewYearWeek(
      this.props.selectedYear, this.props.selectedWeek, change);
    browserHistory.push(`/staffing/?year=${year}&week=${week}`);
  }

  render() {
    if (this.props.employees.loading) {
      return null;
    }
    return (
      <StaffingView
        employees={this.props.employees}
        weeks={this.props.weeks}
        selectedYear={this.props.selectedYear}
        onBackClick={this.onBackClick}
        onForwardClick={this.onForwardClick}
      />
    );
  }
}

StaffingViewContainer.propTypes = {
  selectedYear: React.PropTypes.number.isRequired,
  selectedWeek: React.PropTypes.number.isRequired,

  // mapStateToProps
  weeks: React.PropTypes.object.isRequired,
  employees: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getWorkedDaysPerWeek: React.PropTypes.func.isRequired,
  selectWeek: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  weeks: weeksTotalSelector(state),
  employees: employeesSelector(state)
});

const mapDispatchToProps = {
  getWorkedDaysPerWeek,
  selectWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingViewContainer);
