import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeesSelector from '../selectors/employeesSelector';
import weeksTotalSelector from '../selectors/weeksTotalSelector';
import { getWorkedDaysPerWeek } from '../actions/index';
import StaffingView from '../components/view/index';
import { calculateStartOfWeek, formatDate } from '../utils/weekUtil';
import { browserHistory } from 'react-router';

class StaffingViewContainer extends Component {
  constructor(props) {
    super(props);
    props.getWorkedDaysPerWeek(props.selectedStartOfWeek, props.selectedWeekSpan);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedStartOfWeek !== nextProps.selectedStartOfWeek) {
      this.props.getWorkedDaysPerWeek(nextProps.selectedStartOfWeek, nextProps.selectedWeekSpan);
    }
  }

  onBackClick = () => {
    this.changeStartOfWeek(-1);
  };

  onForwardClick = () => {
    this.changeStartOfWeek(1);
  };

  changeStartOfWeek(change) {
    const startOfWeek = calculateStartOfWeek(
      this.props.selectedStartOfWeek, (change * this.props.selectedWeekSpan));
    browserHistory.push(`/staffing/?start_of_week=${formatDate(startOfWeek)}`);
  }

  render() {
    if (this.props.employees.loading) {
      return null;
    }
    return (
      <StaffingView
        employees={this.props.employees}
        weeks={this.props.weeks}
        selectedYear={this.props.selectedStartOfWeek.get('year')}
        onBackClick={this.onBackClick}
        onForwardClick={this.onForwardClick}
      />
    );
  }
}

StaffingViewContainer.propTypes = {
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapStateToProps
  weeks: React.PropTypes.object.isRequired,
  employees: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getWorkedDaysPerWeek: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  weeks: weeksTotalSelector(state),
  employees: employeesSelector(state)
});

const mapDispatchToProps = {
  getWorkedDaysPerWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingViewContainer);
