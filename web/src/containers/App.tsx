import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Dashboard from './Dashboard';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Redirect exact={true} from="/" to="/dashboard" />
        <Route exact={true} path="/dashboard" component={Dashboard} />
      </Switch>
    );
  }
}

export default App;
