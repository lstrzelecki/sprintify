import * as _ from 'lodash/fp';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

import * as actions from './index';

import { Action, MoveStoryAfterAction, MoveStoryBeforeAction } from './index';
import { type } from '../types';
import { Store } from 'react-redux';
import { State } from '../state/index';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';

const addingNewStory = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type === 'ADD_NEW_STORY')
    .map(action => ({ num: action.num, ...type('EDIT_STORY') }));

type MoveStoryAction = MoveStoryBeforeAction | MoveStoryAfterAction;

const movingStoriesInBacklog = (action$: Rx.Observable<Action>, store: Store<State>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type.startsWith('MOVE_STORY'))
    .map(action => action as MoveStoryAction)
    .filter(withinBacklog(store))
    .map(({ num, relative, type }) =>
      type.endsWith('BEFORE') ?
        actions.reprioritizeBacklogStoryBefore(num, relative) :
        actions.reprioritizeBacklogStoryAfter(num, relative)
    );

const movingStoriesInSprint = (action$: Rx.Observable<Action>, store: Store<State>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type.startsWith('MOVE_STORY'))
    .map(action => action as MoveStoryAction)
    .filter(withinSprint(store))
    .map(({ num, relative, type }) =>
      type.endsWith('BEFORE') ?
        actions.reprioritizeSprintStoryBefore(num, relative) :
        actions.reprioritizeSprintStoryAfter(num, relative)
    );

const assignToSprint = (action$: Rx.Observable<Action>, store: Store<State>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type.startsWith('MOVE_STORY'))
    .map(action => action as MoveStoryAction)
    .filter(toSprint(store))
    .flatMap(({ num, relative, type }) =>
      Observable.of<Action>(
        actions.addToSprint(num),
        type.endsWith('BEFORE') ?
          actions.reprioritizeSprintStoryBefore(num, relative) :
          actions.reprioritizeSprintStoryAfter(num, relative)
      )
    );

const removeFromSprint = (action$: Rx.Observable<Action>, store: Store<State>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type.startsWith('MOVE_STORY'))
    .map(action => action as MoveStoryAction)
    .filter(fromSprint(store))
    .flatMap(({ num, relative, type }) =>
      Observable.of<Action>(
        actions.removeFromSprint(num),
        type.endsWith('BEFORE') ?
          actions.reprioritizeBacklogStoryBefore(num, relative) :
          actions.reprioritizeBacklogStoryAfter(num, relative)
      )
    );

function withinBacklog(store: Store<State>): (action: MoveStoryAfterAction | MoveStoryBeforeAction) => boolean {
  return ({num, relative}) => {
    const stories = store.getState().backlog;
    return !_.isUndefined(_.find({ num }, stories) && _.find({ num: relative }, stories));
  };
}

function withinSprint(store: Store<State>): (action: MoveStoryAfterAction | MoveStoryBeforeAction) => boolean {
  return ({ num, relative }) => {
    const stories = store.getState().currentSprint.stories;
    return !_.isUndefined(_.find({ num }, stories) && _.find({ num: relative }, stories));
  };
}

function toSprint(store: Store<State>): (action: MoveStoryAfterAction | MoveStoryBeforeAction) => boolean {
  return ({ num, relative }) => {
    const sprint = store.getState().currentSprint.stories;
    const backlog = store.getState().backlog;
    return !_.isUndefined(_.find({ num }, backlog) && _.find({ num: relative }, sprint));
  };
}

function fromSprint(store: Store<State>): (action: MoveStoryAfterAction | MoveStoryBeforeAction) => boolean {
  return ({ num, relative }) => {
    const sprint = store.getState().currentSprint.stories;
    const backlog = store.getState().backlog;
    return !_.isUndefined(_.find({ num }, sprint) && _.find({ num: relative }, backlog));
  };
}

export default combineEpics(addingNewStory, movingStoriesInBacklog, movingStoriesInSprint, assignToSprint, removeFromSprint);
