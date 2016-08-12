import React from 'react';

import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';
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

  onClickAdd = () => {
    this.onChange(1);
  };

  onClickRemove = () => {
    this.onChange(this.props.value === 0 ? 7 - this.props.total : -1);
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
        <IconButton
          id={`remove-${props.projectId}-${formatDate(props.startOfWeek)}`}
          disabled={props.total > 6
          && props.value === 0}
          onClick={this.onClickRemove}
        >
          <ContentRemove />
        </IconButton>
        <TextField
          value={props.value}
          style={{ width: 20 }}
          id={`field-${props.projectId}-${formatDate(props.startOfWeek)}`}
          onChange={this.onChangeText}
        />
        <IconButton
          id={`add-${props.projectId}-${formatDate(props.startOfWeek)}`}
          disabled={props.total > 6}
          onClick={this.onClickAdd}
        >
          <ContentAdd />
        </IconButton>
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
