import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App.js';
import Staffing from './containers/Staffing.js';

export default (
  <Route path='/staffing' component={App}>
    <IndexRoute component={Staffing} />
  </Route>
);
