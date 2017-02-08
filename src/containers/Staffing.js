import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import FlatButton from 'material-ui/FlatButton';

import {
  currentDays, currentWeeks, currentMonths, employees, customers, projectNames,
  events, availabilityPerWeek, staffingPerWeek, employeesByProject,
  projectsByEmployee
} from '../selectors';

import {
  fetchProjects, fetchEmployees, fetchHolidays, fetchStaffing, fetchAbsence,
  setTimeline, setTimelineMode, expandCustomers, collapseCustomers,
  expandEmployees, collapseEmployees, staffingToolSelectProjects,
  staffingToolDeselectProjects, staffingToolSelectWeeks,
  staffingToolDeselectWeeks, staffingToolClear, addStaffing, removeStaffing,
  TIMELINE_MODE_CUSTOMERS, TIMELINE_MODE_EMPLOYEES
} from '../actions';

import TimelineData from '../components/TimelineData';
import TimelineHeader from '../components/TimelineHeader';
import TimelineSummary from '../components/TimelineSummary';
import StaffingToolbar from './StaffingToolbar';

const getNumber = (keyCode) => {
  switch (keyCode) {
    case 48: return 0;
    case 49: return 1;
    case 50: return 2;
    case 51: return 3;
    case 52: return 4;
    case 53: return 5;
    default: return -1;
  }
};

class Staffing extends React.PureComponent {
  constructor(props) {
    super(props);
    props.setTimeline(dateFns.startOfMonth(new Date()));
    props.fetchProjects();
    props.fetchEmployees();
    props.fetchHolidays();
    props.fetchStaffing(
      props.currentDays.first(),
      props.currentDays.last()
    );
    props.fetchAbsence(
      props.currentDays.first(),
      props.currentDays.last()
    );
  }

  componentDidMount = () => {
    document.addEventListener('keydown', (e) => {
      const number = getNumber(e.keyCode);
      if (number >= 0) {
        this.handleSetDays(number);
      }
    });
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', (e) => {
      const number = getNumber(e.keyCode);
      if (number >= 0) {
        this.handleSetDays(number);
      }
    });
  }

  getModeLabel = () => {
    switch (this.props.timeline.mode) {
      case TIMELINE_MODE_EMPLOYEES:
        return 'View customers';
      case TIMELINE_MODE_CUSTOMERS:
        return 'View employees';
      default: return '';
    }
  };

  handleToggleTimelineMode = () => {
    switch (this.props.timeline.mode) {
      case TIMELINE_MODE_EMPLOYEES:
        this.props.setTimelineMode(TIMELINE_MODE_CUSTOMERS);
        return;
      case TIMELINE_MODE_CUSTOMERS:
        this.props.setTimelineMode(TIMELINE_MODE_EMPLOYEES);
        return;
      default: return;
    }
  }

  handleToggleCustomers = (customer) => {
    if (this.props.timeline.expandedCustomers.has(customer)) {
      this.props.collapseCustomers([customer]);
    } else {
      this.props.expandCustomers([customer]);
    }
  }

  handleToggleEmployee = (employee) => {
    if (this.props.timeline.expandedEmployees.has(employee)) {
      this.props.collapseEmployees([employee]);
    } else {
      this.props.expandEmployees([employee]);
    }
  }

  handleSelectEmployeeProjectWeek = (employee, project, week) => {
    this.props.staffingToolClear();
    this.props.staffingToolSelectProjects([{
      employeeId: employee,
      projectId: project
    }]);
    this.props.staffingToolSelectWeeks(new Set([week]));
  }

  handleSetDays = (days) => {
    this.props.selectedEmployeeProjects.forEach((x) => {
      this.props.selectedWeeks.forEach((y) => {
        const oldDays = this.props.staffingPerWeek
            .get(x.employeeId, new Map())
            .get(x.projectId, new Map())
            .get(y, 0);
        const deltaDays = days - oldDays;
        const startOfWeek =
          dateFns.startOfWeek(this.props.currentDays
                                  .find((z) => dateFns.getISOWeek(z) === y));
        if (deltaDays > 0) {
          this.props.addStaffing(
            x.employeeId,
            x.projectId,
            dateFns.format(startOfWeek, 'YYYY-MM-DD'),
            Math.abs(deltaDays)
          );
        } else if (deltaDays < 0) {
          this.props.removeStaffing(
            x.employeeId,
            x.projectId,
            dateFns.format(startOfWeek, 'YYYY-MM-DD'),
            Math.abs(deltaDays)
          );
        }
      });
    });
  }

  render = () =>
    (
      <div id='staffing'>
        <StaffingToolbar />
        <div className='staffing-header'>
          <div id='staffing-header-sidebar'>
            <FlatButton
              label={this.getModeLabel()}
              primary
              onClick={() => this.handleToggleTimelineMode()}
            />
          </div>
          <div id='staffing-header-main'>
            <div className='staffing-title'>
              <h1>Bemanning for <em>DUMMIES</em></h1>
            </div>
            <TimelineHeader
              days={this.props.currentDays}
              weeks={this.props.currentWeeks}
              months={this.props.currentMonths}
            />
          </div>
        </div>
        <div
          id='staffing-summary'
          className={this.props.timeline.showSummary || 'hidden'}
        >
          <TimelineSummary
            weeks={this.props.currentWeeks}
          />
        </div>
        <div className='timeline-data'>
          { this.props.timeline.mode === TIMELINE_MODE_CUSTOMERS &&
            this.props.employeesByProject
                .entrySeq()
                .map(([k, v]) =>
                  (
                    <div
                      key={`project-${k}`}
                      className={this.props.timeline.expandedCustomers.has(k) &&
                                 'timeline-data-group-expanded'}
                    >
                      <div className='timeline-data-rows'>
                        <div
                          className='timeline-data-row'
                          onClick={() => this.handleToggleCustomers(k)}
                        >
                          <div className='timeline-data-key'>
                            <div className='timeline-data-label'>
                              {k}
                            </div>
                          </div>
                          <div className='timeline-data-values'>
                            <div className='timeline-data-value'>
                              {this.props.projectNames.get(k)}
                            </div>
                          </div>
                        </div>
                      </div>
                      { this.props.timeline.expandedCustomers.has(k) &&
                        (
                          <TimelineData
                            days={this.props.currentDays}
                            weeks={this.props.currentWeeks}
                            employees={v.map((x) => this.props.employees.get(x))}
                            events={this.props.events}
                            availabilityPerWeek={this.props.availabilityPerWeek}
                            staffingPerWeek={this.props.staffingPerWeek}
                            projectsByEmployee={this.props.projectsByEmployee}
                            projectNames={this.props.projectNames}
                            expandedEmployees={this.props.timeline.expandedEmployees}
                            onToggleExpand={this.handleToggleEmployee}
                            selectedEmployeeProjects={this.props.selectedEmployeeProjects}
                            selectedWeeks={this.props.selectedWeeks}
                            onSelectEmployeeProjectWeek={this.handleSelectEmployeeProjectWeek}
                            onSetDays={this.handleSetDays}
                          />
                        )
                      }
                    </div>
                  ))
          }
          { this.props.timeline.mode === TIMELINE_MODE_EMPLOYEES &&
            (
              <TimelineData
                days={this.props.currentDays}
                weeks={this.props.currentWeeks}
                employees={this.props.employees}
                events={this.props.events}
                availabilityPerWeek={this.props.availabilityPerWeek}
                staffingPerWeek={this.props.staffingPerWeek}
                projectsByEmployee={this.props.projectsByEmployee}
                projectNames={this.props.projectNames}
                expandedEmployees={this.props.timeline.expandedEmployees}
                onToggleExpand={this.handleToggleEmployee}
                selectedEmployeeProjects={this.props.selectedEmployeeProjects}
                selectedWeeks={this.props.selectedWeeks}
                onSelectEmployeeProjectWeek={this.handleSelectEmployeeProjectWeek}
                onSetDays={this.handleSetDays}
              />
            )
          }
        </div>
      </div>
    );
}

Staffing.propTypes = {
  currentDays: React.PropTypes.object.isRequired,
  currentWeeks: React.PropTypes.object.isRequired,
  currentMonths: React.PropTypes.object.isRequired,
  employees: React.PropTypes.object.isRequired,
  customers: React.PropTypes.object.isRequired,
  projectNames: React.PropTypes.object.isRequired,
  timeline: React.PropTypes.object.isRequired,
  events: React.PropTypes.object.isRequired,
  availabilityPerWeek: React.PropTypes.object.isRequired,
  staffingPerWeek: React.PropTypes.object.isRequired,
  employeesByProject: React.PropTypes.object.isRequired,
  projectsByEmployee: React.PropTypes.object.isRequired,
  selectedEmployeeProjects: React.PropTypes.object.isRequired,
  selectedWeeks: React.PropTypes.object.isRequired,

  fetchProjects: React.PropTypes.func.isRequired,
  fetchEmployees: React.PropTypes.func.isRequired,
  fetchHolidays: React.PropTypes.func.isRequired,
  fetchStaffing: React.PropTypes.func.isRequired,
  fetchAbsence: React.PropTypes.func.isRequired,
  setTimeline: React.PropTypes.func.isRequired,
  setTimelineMode: React.PropTypes.func.isRequired,
  expandCustomers: React.PropTypes.func.isRequired,
  collapseCustomers: React.PropTypes.func.isRequired,
  expandEmployees: React.PropTypes.func.isRequired,
  collapseEmployees: React.PropTypes.func.isRequired,
  staffingToolSelectProjects: React.PropTypes.func.isRequired,
  staffingToolDeselectProjects: React.PropTypes.func.isRequired,
  staffingToolSelectWeeks: React.PropTypes.func.isRequired,
  staffingToolDeselectWeeks: React.PropTypes.func.isRequired,
  staffingToolClear: React.PropTypes.func.isRequired,
  addStaffing: React.PropTypes.func.isRequired,
  removeStaffing: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentDays: currentDays(state),
  currentWeeks: currentWeeks(state),
  currentMonths: currentMonths(state),
  employees: employees(state),
  customers: customers(state),
  projectNames: projectNames(state),
  events: events(state),
  timeline: state.timeline,
  availabilityPerWeek: availabilityPerWeek(state),
  staffingPerWeek: staffingPerWeek(state),
  employeesByProject: employeesByProject(state),
  projectsByEmployee: projectsByEmployee(state),
  selectedEmployeeProjects: state.staffingTool.selectedProjects,
  selectedWeeks: state.staffingTool.selectedWeeks,
});

const mapDispatchToProps = {
  fetchProjects,
  fetchEmployees,
  fetchHolidays,
  fetchStaffing,
  fetchAbsence,
  setTimeline,
  setTimelineMode,
  expandCustomers,
  collapseCustomers,
  expandEmployees,
  collapseEmployees,
  staffingToolSelectProjects,
  staffingToolDeselectProjects,
  staffingToolSelectWeeks,
  staffingToolDeselectWeeks,
  staffingToolClear,
  addStaffing,
  removeStaffing
};

export default connect(mapStateToProps, mapDispatchToProps)(Staffing);
