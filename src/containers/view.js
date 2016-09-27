import React, { Component } from 'react';
import { connect } from 'react-redux';
import viewHeaderSelector from '../selectors/viewHeaderSelector';
import viewBodySelector from '../selectors/viewBodySelector';
import summarySelector from '../selectors/summarySelector';
import { getWorkedDaysPerWeek, selectWeekSpan } from '../actions/index';
import StaffingView from '../components/view/index';
import { calculateStartOfWeek, formatDate } from '../utils/weekUtil';

class StaffingViewContainer extends Component {
  constructor(props) {
    super(props);
    props.getWorkedDaysPerWeek(props.selectedStartOfWeek, props.selectedWeekSpan);
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.handleResize(this.props));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedStartOfWeek !== nextProps.selectedStartOfWeek) {
      this.props.getWorkedDaysPerWeek(nextProps.selectedStartOfWeek, nextProps.selectedWeekSpan);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.handleResize(this.props));
  }

  getPreviousStartOfWeek = () =>
    this.getStartOfWeek(-1);

  getNextStartOfWeek = () =>
    this.getStartOfWeek(1);

  getStartOfWeek(change) {
    const startOfWeek = calculateStartOfWeek(
      this.props.selectedStartOfWeek, (change * this.props.selectedWeekSpan) / 2);
    return `${this.props.location.pathname}?start_of_week=${formatDate(startOfWeek)}`;
  }

  handleResize(props) {
    const appWidth = document.getElementById('app').offsetWidth;
    const firstColWidth = document.getElementsByClassName('first-col')[0].offsetWidth;
    const cellWidth = document.getElementsByClassName('week-header-col')[0].offsetWidth;
    const weekSpanFromWindowWidth = (appWidth - firstColWidth) / cellWidth;
    if (weekSpanFromWindowWidth > 0) {
      props.selectWeekSpan(Math.floor(weekSpanFromWindowWidth));
    }
  }

  render() {
    if (this.props.tableHeader.loading ||
        this.props.tableBody.loading ||
        this.props.tableFooter.loading) {
      return null;
    }
    return (
      <StaffingView
        ref={() => this.handleResize(this.props)}
        tableHeader={
          Object.assign({},
          this.props.tableHeader.data,
            {
              previousStartOfWeek: this.getPreviousStartOfWeek(),
              nextStartOfWeek: this.getNextStartOfWeek()
            }
          )
        }
        tableBody={this.props.tableBody.data}
        tableFooter={this.props.tableFooter.data}
        edit={this.props.children}
      />
    );
  }
}

StaffingViewContainer.propTypes = {
  children: React.PropTypes.object,
  location: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  selectedStartOfWeek: React.PropTypes.object.isRequired,
  selectedWeekSpan: React.PropTypes.number.isRequired,

  // mapStateToProps
  tableHeader: React.PropTypes.object.isRequired,
  tableBody: React.PropTypes.object.isRequired,
  tableFooter: React.PropTypes.object.isRequired,

  // mapDispatchToProps
  getWorkedDaysPerWeek: React.PropTypes.func.isRequired,
  selectWeekSpan: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  selectedStartOfWeek: state.selected_start_of_week,
  selectedWeekSpan: state.selected_week_span,

  tableHeader: viewHeaderSelector(state, ownProps),
  tableBody: viewBodySelector(state, ownProps),
  tableFooter: summarySelector(state, ownProps),
});

const mapDispatchToProps = {
  getWorkedDaysPerWeek,
  selectWeekSpan,
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingViewContainer);
