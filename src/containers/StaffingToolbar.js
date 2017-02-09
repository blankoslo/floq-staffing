import React from 'react';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import {
  setTimeline, setTimelineMode, setTimelineFilterAvailableTime,
  setTimelineShowSummary, setTimelineFilter
} from '../actions';

class StaffingToolbar extends React.PureComponent {
  getTimelineMonthSpan = () =>
    dateFns.differenceInMonths(
      this.props.timeline.endDate,
      this.props.timeline.startDate
    );

  handleShiftTimeline = (delta) => {
    const startDate = dateFns.addMonths(this.props.timeline.startDate, delta);
    this.props.setTimeline(startDate);
  }

  handleZoomTimeline = (delta) => {
    this.props.setTimeline(
      this.props.timeline.startDate,
      dateFns.addMonths(this.props.timeline.endDate, delta)
    );
  }

  handleToggleShowSummary = (event, showSummary) => {
    this.props.setTimelineShowSummary(showSummary);
  }

  handleToggleFilterAvailableTime = (event, filterAvailableTime) => {
    this.props.setTimelineFilterAvailableTime(filterAvailableTime);
  }

  handleSearch = (event, value) => {
    this.props.setTimelineFilter(value);
  }

  render = () =>
    (
      <Toolbar>
        <ToolbarGroup>
          <TextField
            hintText='Search...'
            onChange={this.handleSearch}
          />
          <Toggle
            label='Only show with available time'
            labelPosition='right'
            className='toolbar-toggle'
            toggled={this.props.timeline.filterAvailableTime}
            onToggle={this.handleToggleFilterAvailableTime}
          />
        </ToolbarGroup>
        <ToolbarGroup>
          <IconButton
            iconClassName='material-icons'
            onClick={() => this.handleShiftTimeline(-1)}
          >
            arrow_back
          </IconButton>
          <IconButton
            iconClassName='material-icons'
            onClick={() => this.handleShiftTimeline(1)}
          >
            arrow_forward
          </IconButton>
          <IconButton
            iconClassName='material-icons'
            onClick={() => this.handleZoomTimeline(1)}
            disabled={!(this.getTimelineMonthSpan() < 10)}
          >
            zoom_out
          </IconButton>
          <IconButton
            iconClassName='material-icons'
            onClick={() => this.handleZoomTimeline(-1)}
            disabled={!(this.getTimelineMonthSpan() > 0)}
          >
            zoom_in
          </IconButton>
          <Toggle
            label='Summary'
            labelPosition='right'
            className='toolbar-toggle'
            toggled={this.props.timeline.showSummary}
            onToggle={this.handleToggleShowSummary}
          />
        </ToolbarGroup>
      </Toolbar>
    );
}

StaffingToolbar.propTypes = {
  timeline: React.PropTypes.object.isRequired,

  setTimeline: React.PropTypes.func.isRequired,
  setTimelineMode: React.PropTypes.func.isRequired,
  setTimelineShowSummary: React.PropTypes.func.isRequired,
  setTimelineFilterAvailableTime: React.PropTypes.func.isRequired,
  setTimelineFilter: React.PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  timeline: state.timeline
});

const mapDispatchToProps = {
  setTimeline,
  setTimelineMode,
  setTimelineShowSummary,
  setTimelineFilterAvailableTime,
  setTimelineFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffingToolbar);
