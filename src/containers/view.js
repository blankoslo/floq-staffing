import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeesSelector from '../selectors/employeesSelector';
import weeksSelector from '../selectors/weeksSelector';
import { getWorkedDaysPerWeek } from '../actions/index';

import StaffingView from '../components/view/index';

class StaffingViewContainer extends Component {
  constructor(props) {
    super(props);
    props.getWorkedDaysPerWeek(props.selectedYear, props.selectedWeek);
  }

  componentWillRender(nextProps) {
    if (this.props.selectedYear !== nextProps.selectedYear
      || this.props.selectedWeek !== nextProps.selectedWeek) {
      this.props.getWorkedDaysPerWeek(nextProps.selectedYear, nextProps.selectedWeek);
    }
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
      />
    );
  }
}

StaffingViewContainer.propTypes = {
  selectedYear: React.PropTypes.number.isRequired,
  selectedWeek: React.PropTypes.number.isRequired,

  // mapStateToProps
  weeks: React.PropTypes.array.isRequired,
  employees: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getWorkedDaysPerWeek: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  weeks: weeksSelector(state),
  employees: employeesSelector(state)
});

const mapDispatchToProps = {
  getWorkedDaysPerWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingViewContainer);
