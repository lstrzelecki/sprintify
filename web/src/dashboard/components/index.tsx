import * as _ from 'lodash';
import * as React from 'react';
import pure from '@utils/pure';
import { connect } from 'react-redux';

import { State } from '../state';
import * as actions from '../actions';

import Dashboard from './Dashboard';

function DashboardContainer(props: State) {

  return (
    <Dashboard
      backlog={props.backlog}
      milestones={props.milestones}
      deadlines={props.deadlines}
      currentSprint={props.currentSprint}
      edited={props.edited}
      ui={props.ui}
    />
  );

}

const connector = connect<State>(_.identity, actions);
export default connector(pure(DashboardContainer));