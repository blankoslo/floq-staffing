import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeeSelector from '../selectors/employeeSelector';
import tableDataSelector from '../selectors/tableDataSelector';
import { selectEmployee, addStaffing, removeStaffing } from '../actions/index';
import calculateNewYearWeek from '../utils/weekUtil';
import { browserHistory } from 'react-router';

class Edit extends Component {
  constructor(props) {
    super(props);
    if (props.params.id !== undefined) {
      props.selectEmployee(props.params.id);
    }
  }

  onChange = (projectId, week, days) => {
    // TODO: replace checks with validation?
    if (days > 0 && days <= 7) {
      this.props.addStaffing({
        in_employee: this.props.employee.data.id,
        in_project: projectId,
        in_week: week,
        in_days: days,
        in_year: this.props.selectedYear,
      });
    } else if (days < 0 && days >= -7) {
      this.props.removeStaffing({
        in_employee: this.props.employee.data.id,
        in_project: projectId,
        in_week: week,
        in_days: Math.abs(days),
        in_year: this.props.selectedYear,
      });
    }
  };

  onBackClick = () => {
    this.changeYearAndWeek(-5);
  };

  onForwardClick = () => {
    this.changeYearAndWeek(5);
  };

  changeYearAndWeek(change) {
    const { year, week } = calculateNewYearWeek(
      this.props.selectedYear, this.props.selectedWeek, change);
    browserHistory.push(`/staffing/edit/${this.props.employee.data.id}/?year=${year}&week=${week}`);
  }

  render() {
    if (this.props.employee.loading || this.props.tableData.loading) {
      return null;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employee: this.props.employee,
        tableData: this.props.tableData,
        onChange: this.onChange,
        onBackClick: this.onBackClick,
        onForwardClick: this.onForwardClick,
      }));

    return (
      <div>
        {children}
      </div>
    );
  }
}

Edit.propTypes = {
  params: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,
  selectedYear: React.PropTypes.number.isRequired,
  selectedWeek: React.PropTypes.number.isRequired,

  // mapStateToProps
  employee: React.PropTypes.object.isRequired,
  tableData: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  selectEmployee: React.PropTypes.func.isRequired,
  addStaffing: React.PropTypes.func.isRequired,
  removeStaffing: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employee: employeeSelector(state),
  tableData: tableDataSelector(state)
});

const mapDispatchToProps = {
  selectEmployee,
  addStaffing,
  removeStaffing
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
