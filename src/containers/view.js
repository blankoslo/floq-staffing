import React, { Component } from 'react';
import { connect } from 'react-redux';
import viewHeaderSelector from '../selectors/viewHeaderSelector';
import viewBodySelector from '../selectors/viewBodySelector';
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
    if (this.props.tableHeader.loading || this.props.tableBody.loading) {
      return null;
    }
    return (
      <StaffingView
        tableHeader={
          Object.assign({},
          this.props.tableHeader.data,
          { onBackClick: this.onBackClick, onForwardClick: this.onForwardClick })
        }
        tableBody={this.props.tableBody.data}
      />
    );
  }
}

StaffingViewContainer.propTypes = {
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapStateToProps
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getWorkedDaysPerWeek: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  tableHeader: viewHeaderSelector(state),
  tableBody: viewBodySelector(state)
});

const mapDispatchToProps = {
  getWorkedDaysPerWeek
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingViewContainer);
