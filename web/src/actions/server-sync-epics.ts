// import * as _ from 'lodash/fp';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { Action, initializeDashboard } from './index';

import graphql from '../utils/graphql';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';

export default (action$: Rx.Observable<Action>) =>
  action$
    .filter(({ type }) => type === LOCATION_CHANGE)
    .map(action => action as LocationChangeAction)
    .do(console.log)
    .filter(({ payload: location }) => location.pathname === '/dashboard')
    .flatMap(() => graphql(queryForDashboard).then(({ dashboard }) => initializeDashboard(dashboard)));

const queryForDashboard = `{
  dashboard {
    backlog {
      num
      title
      size
    },
    milestones {
      name
      after
    },
    deadlines {
      name
      date
    },
    currentSprint {
      stories {
        num
        title
        size
      }
      start
      end
    }
  }
}`;