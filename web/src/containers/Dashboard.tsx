import * as _ from 'lodash';
import * as React from 'react';
import pure from '../components/pure';
import { connect } from 'react-redux';

import { State } from '../state';
import * as actions from '../actions';

import Dashboard from '../components/Dashboard/Dashboard';

type Actions = typeof actions;

function DashboardContainer(props: State & Actions) {

  return (
    <Dashboard
      backlog={props.backlog}
      milestones={props.milestones}
      currentSprint={props.currentSprint}
      edited={props.edited}
    />
  );

}

const connector = connect<State & Actions>(_.identity, actions);
export default connector(pure(DashboardContainer));