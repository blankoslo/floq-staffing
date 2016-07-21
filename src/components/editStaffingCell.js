import React from 'react';

import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import IconButton from 'material-ui/IconButton';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class EditStaffingCell extends React.Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    const props = this.props;
    return (
      <div>
        <IconButton
          id={`remove-${props.projectId}-${props.week}`}
          disabled={props.total > 6
          && props.value === 0}
          onClick={() => props.onChange(
            props.projectId,
            props.week,
            props.value === 0 ? 7 - props.total : -1)
          }
        >
          <ContentRemove />
        </IconButton>
        <TextField
          value={props.value}
          style={{ width: 20 }}
          id={`field-${props.projectId}-${props.week}`}
          onChange={e => props.onChange(
            props.projectId,
            props.week,
            e.target.value - props.value)
          }
        />
        <IconButton
          id={`add-${props.projectId}-${props.week}`}
          disabled={props.total > 6}
          onClick={() => props.onChange(
            props.projectId,
            props.week,
            1)
          }
        >
          <ContentAdd />
        </IconButton>
      </div>
  ); }
}

EditStaffingCell.propTypes = {
  value: React.PropTypes.number,
  colIndex: React.PropTypes.number,
  week: React.PropTypes.number,
  total: React.PropTypes.number,
  projectId: React.PropTypes.string,
  onChange: React.PropTypes.func
};

export default EditStaffingCell;
