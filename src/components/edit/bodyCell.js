import React, { Component } from 'react';

class StaffingEditBodyCell extends Component {

  onChangeText = e => {
    const value = e.target.value;
    if (value < 0 || value > 7) {
      // TODO: Add validation instead?
      return;
    }
    const change = value - this.props.value;
    if (change === 0 || (change > 0 && this.props.weekSum + change > 7)) {
      return;
    }
    this.props.onChange(
      this.props.projectid,
      this.props.startOfWeek,
      change);
  };

  selectInput = () => {
    if (this.props.value === null) return;

    this.textinput.select();
  }

  render() {
    return (
      <td
        style={{
          borderLeft: '1px solid rgba(0,0,0,.12)',
          textAlign: 'center',
          color: this.props.textColor,
          fontWeight: this.props.fontWeight,
          backgroundColor: this.props.backgroundColor,
        }}
        onClick={this.selectInput}
      >
        {this.props.value === null ? null :
          <input
            type='text'
            value={this.props.value}
            onChange={this.onChangeText}
            style={{ width: 20, textAlign: 'center', display: 'inline' }}
            className={'mdl-textfield mdl-js-textfield mdl-textfield__input'}
            ref={input => (this.textinput = input)}
            onFocus={this.selectInput}
          />}
      </td>
    );
  }
}

StaffingEditBodyCell.propTypes = {
  value: React.PropTypes.number,
  weekSum: React.PropTypes.number.isRequired,
  projectid: React.PropTypes.string.isRequired,
  startOfWeek: React.PropTypes.object.isRequired,
  onChange: React.PropTypes.func.isRequired,
  textColor: React.PropTypes.string.isRequired,
  fontWeight: React.PropTypes.string.isRequired,
  backgroundColor: React.PropTypes.string.isRequired
};

export default StaffingEditBodyCell;
