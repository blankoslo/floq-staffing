import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './containers/app';
import Edit from './containers/edit';

import EditStaffing from './components/editStaffing';
import ViewStaffing from './components/viewStaffing';

export default (
  <Route path='/staffing' component={App}>/>
    <IndexRoute component={ViewStaffing} />

    <Route path='edit/:id' component={Edit}>
      <IndexRoute component={EditStaffing} />
    </Route>
  </Route>
);
