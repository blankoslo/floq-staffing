import React from 'react';
import { List, OrderedMap } from 'immutable';
import dateFns from 'date-fns';
import classnames from 'classnames';

import { EmployeeProject } from '../reducers/staffingTool';
import { UNAVAILABLE, BILLABLE } from '../selectors/index';

import AddProjectDialog from './AddProjectDialog';

const TimelineDay = (props) => {
  const events = props.events;
  const eventsStr = events.count() > 0
                 && ` | ${events.map((x) => x.name).join(', ')}`;
  const unavailable = events.some((x) => x.billable === UNAVAILABLE);
  const billable = events.some((x) => x.billable === BILLABLE);
  const dayClassNames = classnames({
    'timeline-data-day': true,
    'timeline-data-day-event-unavailable': unavailable,
    'timeline-data-day-event-staffed': !unavailable && events.count() > 0,
    'timeline-data-day-event-staffed-billable': billable
  });
  return (
    <div
      className={dayClassNames}
      title={`${dateFns.format(props.day, 'YYYY-M-D')}${eventsStr || ''}`}
    />
  );
};

TimelineDay.propTypes = {
  day: React.PropTypes.object.isRequired,
  events: React.PropTypes.object.isRequired
};

const TimelineWeek = (props) => {
  const weekDayStrs = props.weekDays
                           .map((x) => dateFns.format(x, 'YYYY-MM-DD'));
  const staffedDays = props.availabilityPerWeek.staffedDays;
  const availableDays = props.availabilityPerWeek.availableDays;
  const overstaffed = staffedDays > availableDays;
  return (
    <div
      className='timeline-data-week'
      style={{ width: `calc(${props.weekSpanPercentage}%)` }}
    >
      <div
        className={classnames({
          'timeline-data-week-staffing': true,
          'timeline-data-week-staffing-overstaffed': overstaffed
        })}
      >
        {`${staffedDays}/${availableDays}`}
      </div>
      <div className='timeline-data-days'>
        { weekDayStrs.map((x, i) =>
          (
            <TimelineDay
              key={`day-${x}`}
              day={props.weekDays.get(i)}
              events={props.events.get(x, new List())}
            />
          ))
        }
      </div>
    </div>
  );
};

TimelineWeek.propTypes = {
  weekSpanPercentage: React.PropTypes.number.isRequired,
  weekDays: React.PropTypes.object.isRequired,
  events: React.PropTypes.object.isRequired,
  availabilityPerWeek: React.PropTypes.object.isRequired
};

const TimelineProject = (props) => (
  <div
    className='timeline-data-row'
  >
    <div className='timeline-data-key'>
      <div
        className='timeline-data-label'
        title={props.name}
        style={{ paddingLeft: '2rem' }}
      >
        {props.projectId}
      </div>
    </div>
    <div className='timeline-data-values'>
      <div className='timeline-data-weeks'>
        { props.weeks.entrySeq().map(([k, v]) =>
          (
            <div
              key={`week-${k}`}
              className={
                classnames({
                  'timeline-data-week': true,
                  'timeline-data-week-selected': props.selected && props.selectedWeeks.has(k)
                })
              }
              style={{ width: `calc(${v * 100}%)` }}
              onClick={() =>
                props.onSelectEmployeeProjectWeek(props.employeeId, props.projectId, k)
              }
            >
              {props.staffingPerWeek.get(k)}
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

TimelineProject.propTypes = {
  employeeId: React.PropTypes.number.isRequired,
  projectId: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  weeks: React.PropTypes.object.isRequired,
  staffingPerWeek: React.PropTypes.object.isRequired,
  selected: React.PropTypes.bool.isRequired,
  selectedWeeks: React.PropTypes.object.isRequired,
  onSelectEmployeeProjectWeek: React.PropTypes.func.isRequired
};

const TimelineEmployee = (props) => (
  <div className={props.expand && 'timeline-data-group-expanded'}>
    <div
      className='timeline-data-row'
      onClick={() => props.onToggleExpand &&
                   props.onToggleExpand(props.employee.id)
              }
    >
      <div className='timeline-data-key'>
        <div className='timeline-data-label'>
          {`${props.employee.first_name} ${props.employee.last_name}`}
        </div>
      </div>
      <div className='timeline-data-values'>
        <div className='timeline-data-weeks'>
          { props.weeks.entrySeq().map(([k, v]) =>
            (
              <TimelineWeek
                key={`week-${k}`}
                weekSpanPercentage={v * 100}
                weekDays={props.weekDays.get(k)}
                events={props.events.get(props.employee.id, new OrderedMap())}
                availabilityPerWeek={props.availabilityPerWeek
                                          .get(k, new OrderedMap())}
              />
            ))
          }
        </div>
      </div>
    </div>
    <div>
      {props.expand &&
       (
         <div style={{ textAlign: 'left' }}>
           { props.employeeProjects.map((x) => props.projects.get(x).active &&
             (
               <TimelineProject
                 key={`${props.employee.id}-${x}`}
                 employeeId={props.employee.id}
                 projectId={x}
                 name={props.projectNames.get(x, '')}
                 weeks={props.weeks}
                 staffingPerWeek={props.staffingPerWeek.get(x, new OrderedMap())}
                 selected={props.selectedEmployeeProjects.has(new EmployeeProject({
                   employeeId: props.employee.id,
                   projectId: x
                 }))}
                 selectedWeeks={props.selectedWeeks}
                 onSelectEmployeeProjectWeek={props.onSelectEmployeeProjectWeek}
               />
             ))
           }
           <div style={{ display: 'flex', alignItems: 'center' }}>
             <AddProjectDialog employeeId={props.employee.id} />
             <a href={`https://inni.blank.no/calendar/${props.employee.id}`} target='_blank' rel='noopener noreferrer'>
              Gå til fraværskalenderen
            </a>
           </div>
         </div>
       )
      }
    </div>
  </div>
);

TimelineEmployee.propTypes = {
  weeks: React.PropTypes.object.isRequired,
  employee: React.PropTypes.object.isRequired,
  events: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  employeeProjects: React.PropTypes.object.isRequired,
  availabilityPerWeek: React.PropTypes.object.isRequired,
  staffingPerWeek: React.PropTypes.object.isRequired,
  expand: React.PropTypes.bool,
  onToggleExpand: React.PropTypes.func,
  selectedEmployeeProjects: React.PropTypes.object.isRequired,
  selectedWeeks: React.PropTypes.object.isRequired,
  onSelectEmployeeProjectWeek: React.PropTypes.func.isRequired
};

const TimelineData = (props) => {
  const weekDays = props.days.groupBy(dateFns.getISOWeek);
  return (
    <div className='timeline-data-rows'>
      { props.employees.valueSeq().map((x) =>
        (
          <TimelineEmployee
            key={`employee-${x.id}`}
            employee={x}
            weeks={props.weeks}
            weekDays={weekDays}
            events={props.events}
            availabilityPerWeek={props.availabilityPerWeek.get(x.id, new OrderedMap())}
            staffingPerWeek={props.staffingPerWeek.get(x.id, new OrderedMap())}
            projects={props.projects}
            employeeProjects={props.projectsByEmployee.get(x.id, new List())}
            projectNames={props.projectNames}
            expand={props.expandedEmployees.has(x.id)}
            onToggleExpand={props.onToggleExpand}
            selectedEmployeeProjects={props.selectedEmployeeProjects}
            selectedWeeks={props.selectedWeeks}
            onSelectEmployeeProjectWeek={props.onSelectEmployeeProjectWeek}
          />
        ))
      }
    </div>
  );
};

TimelineData.propTypes = {
  days: React.PropTypes.object.isRequired,
  weeks: React.PropTypes.object.isRequired,
  employees: React.PropTypes.object.isRequired,
  events: React.PropTypes.object.isRequired,
  availabilityPerWeek: React.PropTypes.object.isRequired,
  staffingPerWeek: React.PropTypes.object.isRequired,
  projects: React.PropTypes.object.isRequired,
  projectsByEmployee: React.PropTypes.object.isRequired,
  projectNames: React.PropTypes.object.isRequired,
  expandedEmployees: React.PropTypes.object.isRequired,
  onToggleExpand: React.PropTypes.func,
  selectedEmployeeProjects: React.PropTypes.object.isRequired,
  selectedWeeks: React.PropTypes.object.isRequired,
  onSelectEmployeeProjectWeek: React.PropTypes.func.isRequired
};

export default TimelineData;
