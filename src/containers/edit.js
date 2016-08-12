import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeeSelector from '../selectors/employeeSelector';
import tableDataSelector from '../selectors/tableDataSelector';
import { selectEmployee, addStaffing, removeStaffing } from '../actions/index';
import { formatDate, calculateStartOfWeek } from '../utils/weekUtil';
import { browserHistory } from 'react-router';

class Edit extends Component {
  constructor(props) {
    super(props);
    if (props.params.id !== undefined) {
      props.selectEmployee(props.params.id);
    }
  }

  onChange = (projectId, startOfWeek, days) => {
    // TODO: replace checks with validation?
    if (days > 0 && days <= 7) {
      this.props.addStaffing({
        in_employee: this.props.employee.data.id,
        in_project: projectId,
        in_start_of_week: startOfWeek,
        in_days: days,
      });
    } else if (days < 0 && days >= -7) {
      this.props.removeStaffing({
        in_employee: this.props.employee.data.id,
        in_project: projectId,
        in_start_of_week: startOfWeek,
        in_days: Math.abs(days),
      });
    }
  };

  onBackClick = () => {
    this.changeStartOfWeek(-1);
  };

  onForwardClick = () => {
    this.changeStartOfWeek(1);
  };

  changeStartOfWeek(change) {
    const startOfWeek = calculateStartOfWeek(
      this.props.selectedStartOfWeek, (change * this.props.selectedWeekSpan));
    browserHistory.push(`/staffing/edit/${this.props.employee.data.id}/` +
      `?start_of_week=${formatDate(startOfWeek)}`);
  }

  render() {
    if (this.props.employee.loading || this.props.tableData.loading) {
      return null;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        selectedYear: this.props.selectedStartOfWeek.get('year'),
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
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

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
