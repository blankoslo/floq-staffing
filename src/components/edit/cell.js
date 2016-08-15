import React from 'react';

import TextField from 'material-ui/TextField';
import { formatDate } from '../../utils/weekUtil';

class EditStaffingCell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value
    || this.props.total === 7
    || nextProps.total === 7;
  }

  onChange = value => {
    this.props.onChange(
      this.props.projectId,
      this.props.startOfWeek,
      value);
  };

  onChangeText = e => {
    const value = e.target.value;
    if (value < 0 || value > 7) {
      // TODO: Add validation instead?
      return;
    }
    const change = value - this.props.value;
    if (change === 0 || (change > 0 && this.props.total + change > 7)) {
      return;
    }
    this.onChange(change);
  }

  render() {
    const props = this.props;
    return (
      <div>
        <TextField
          value={props.value}
          style={{ width: 20 }}
          id={`field-${props.projectId}-${formatDate(props.startOfWeek)}`}
          onChange={this.onChangeText}
        />
      </div>
  ); }
}

EditStaffingCell.propTypes = {
  value: React.PropTypes.number,
  colIndex: React.PropTypes.number,
  startOfWeek: React.PropTypes.object,
  total: React.PropTypes.number,
  projectId: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default EditStaffingCell;
