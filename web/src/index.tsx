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

import App from './containers/App';
import app from './reducers';
import epics from './actions/epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const epicMiddleware = createEpicMiddleware(epics);

const store = createStore(
  app,
  composeEnhancers(applyMiddleware(epicMiddleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
