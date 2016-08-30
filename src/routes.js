import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppContainer from './containers/app';
import EditContainer from './containers/edit';
import ViewContainer from './containers/view';

export default (
  <Route path='/staffing' component={AppContainer}>
    <IndexRoute component={ViewContainer} />
    <Route path='' component={ViewContainer}>
      <Route path=':employeeId' component={EditContainer} />
    </Route>
  </Route>
);
