import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {

  // need some bogus to trick the linter at this inital commit.
  state = {
    fake: 'state'
  }

  render() {
    const children = React.Children.map(this.props.children,
      child => React.cloneElement(child, {
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
  children: React.PropTypes.object
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
