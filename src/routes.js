import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import StaffingGrid from './components/staffingGrid';

export default (
  <Route path='/staffing' component={App}>/>
    <IndexRoute component={StaffingGrid} />
  </Route>
);
