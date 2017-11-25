import * as React from 'react';
// import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Redirect, Route, Switch } from 'react-router';

import Dashboard from './dashboard/components';
import dashboardReducer from './dashboard/reducers';
import dashboardEpics from './dashboard/epics';

export class App extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact={true} from="/" to="/dashboard" />
        <Route exact={true} path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export const reducer = dashboardReducer;

export const epics = combineEpics(dashboardEpics);