import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ErrorDialog from './ErrorDialog';

const muiTheme = getMuiTheme({
  fontFamily: 'museo-sans'
});

const App = (props) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <div id='app-main'>
      <ErrorDialog />
      {props.children}
    </div>
  </MuiThemeProvider>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired
};

export default App;
