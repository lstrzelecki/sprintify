// tslint:disable-next-line:no-any
declare const window: { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: (args: any) => any};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createEpicMiddleware } from 'redux-observable';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'typeface-open-sans';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware, ConnectedRouter } from 'react-router-redux';

import { App, reducer, epics } from './app';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const epicMiddleware = createEpicMiddleware(epics);

const history = createBrowserHistory();
const routerMiddleware = createRouterMiddleware(history);

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware, epicMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
