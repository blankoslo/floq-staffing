import React from 'react';
import { IndexRoute, Route } from 'react-router';

import AppContainer from './containers/app';
import EditContainer from './containers/edit';
import ViewContainer from './containers/view';

export default (
  <Route path='/staffing' component={AppContainer}>
    <IndexRoute component={ViewContainer} />
    <Route path='edit/:id' component={EditContainer} />
  </Route>
);
