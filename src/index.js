import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

import apiMiddleware from './middleware/api';
import routes from './routes';
import rootReducer from './reducers';

require('../styles/main.less');

injectTapEventPlugin();

const reducers = combineReducers({
  ...rootReducer,
  routing: routerReducer
});

const createStoreWithMiddleware = compose(
  applyMiddleware(apiMiddleware, thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducers);
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
  , document.getElementById('app')
);
