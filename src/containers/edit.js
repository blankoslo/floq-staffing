import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeeSelector from '../selectors/employeeSelector';
import editBodySelector from '../selectors/editBodySelector';
import { addStaffing, removeStaffing,
  getEmployeeWorkedDaysPerWeek } from '../actions/index';
import StaffingEdit from '../components/edit/index';

class Edit extends Component {
  constructor(props) {
    super(props);
    if (props.selectedEmployee !== null) {
      props.getEmployeeWorkedDaysPerWeek(
        props.selectedEmployee,
        props.selectedStartOfWeek,
        props.selectedWeekSpan
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.employee.loading && !this.props.employee.loading &&
        (nextProps.employee.data.id !== this.props.employee.data.id ||
        nextProps.selectedStartOfWeek !== this.props.selectedStartOfWeek ||
        nextProps.selectedWeekSpan !== this.props.selectedWeekSpan)) {
      this.props.getEmployeeWorkedDaysPerWeek(
        nextProps.employee.data.id,
        nextProps.selectedStartOfWeek,
        nextProps.selectedWeekSpan
      );
    }
  }

  onChange = (projectId, startOfWeek, days) => {
    const data = {
      in_employee: this.props.employee.data.id,
      in_project: projectId,
      in_start_of_week: startOfWeek,
      in_days: Math.abs(days),
    };
    if (days > 0 && days <= 7) this.props.addStaffing(data);
    else if (days < 0 && days >= -7) this.props.removeStaffing(data);
  };

  render() {
    if (this.props.employee.loading ||
        this.props.tableBody.loading ||
        this.props.selectedEmployee === null) {
      return null;
    }
    return (<StaffingEdit
      data={{ projects: this.props.tableBody.data, onClick: this.onClick, onChange: this.onChange }}
    />);
  }
}

Edit.propTypes = {
  selectedEmployee: React.PropTypes.number,
  selectedStartOfWeek: React.PropTypes.object,
  selectedWeekSpan: React.PropTypes.number,

  // mapStateToProps
  employee: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  addStaffing: React.PropTypes.func.isRequired,
  removeStaffing: React.PropTypes.func.isRequired,
  getEmployeeWorkedDaysPerWeek: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selectedStartOfWeek: state.selected_start_of_week,
  selectedWeekSpan: state.selected_week_span,
  selectedEmployee: state.selected_employee,

  employee: employeeSelector(state),
  tableBody: editBodySelector(state)
});

const mapDispatchToProps = {
  addStaffing,
  removeStaffing,
  getEmployeeWorkedDaysPerWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
