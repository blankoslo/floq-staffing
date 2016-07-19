import React, { Component } from 'react';
import { connect } from 'react-redux';
import employeeSelector from '../selectors/employeeSelector';
import tableDataSelector from '../selectors/tableDataSelector';
import { selectEmployee, selectYear, selectWeek,
  addStaffing, removeStaffing } from '../actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    if (props.params.id !== undefined) {
      const selectedId = props.params.id;
      props.selectEmployee(selectedId);
      props.selectYear(props.location.query.year);
      props.selectWeek(props.location.query.week);
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
        in_year: this.props.selected_year,
      });
    } else if (days < 0 && days >= -7) {
      this.props.removeStaffing({
        in_employee: this.props.employee.data.id,
        in_project: projectId,
        in_week: week,
        in_days: Math.abs(days),
        in_year: this.props.selected_year,
      });
    }
  };

  // TODO: componentwillrender ny params id

  render() {
    if (this.props.employee.loading || this.props.tableData.loading) {
      return null;
    }
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
        employee: this.props.employee,
        tableData: this.props.tableData,
        onChange: this.onChange
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
  location: React.PropTypes.object.isRequired,
  children: React.PropTypes.object,
  projects: React.PropTypes.object.isRequired,
  employees: React.PropTypes.object.isRequired,
  staffing: React.PropTypes.object.isRequired,
  selected_year: React.PropTypes.number.isRequired,

  // mapStateToProps
  employee: React.PropTypes.object.isRequired,
  tableData: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  selectEmployee: React.PropTypes.func.isRequired,
  selectYear: React.PropTypes.func.isRequired,
  selectWeek: React.PropTypes.func.isRequired,
  addStaffing: React.PropTypes.func.isRequired,
  removeStaffing: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  employee: employeeSelector(state),
  tableData: tableDataSelector(state),
  selected_year: state.selected_year
});

const mapDispatchToProps = {
  selectEmployee,
  selectYear,
  selectWeek,
  addStaffing,
  removeStaffing
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
