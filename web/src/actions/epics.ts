import * as _ from 'lodash/fp';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';

import storyMigrationEpics from './story-migration-epics';

import * as actions from './index';

import { Action, AddNewStoryAction, RenameStoryAction, AddNewMilestoneAction } from './index';
import { combineEpics } from 'redux-observable';
import { Store } from 'react-redux';
import { State } from '../state';

const addingNewStory = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(({ type }) => type === 'ADD_NEW_STORY')
    .map(action => action as AddNewStoryAction)
    .delay(500)
    .map(({num}) => actions.editStory(num));

const addingNewMilestone = (action$: Rx.Observable<Action>, store: Store<State>): Rx.Observable<Action> =>
  action$
    .filter(({ type }) => type === 'ADD_NEW_MILESTONE')
    .map(action => action as AddNewMilestoneAction)
    .map(({ name }) => actions.moveMilestoneAfter(name, lastStoryOf(store)));

function lastStoryOf(store: Store<State>): number {
  return _.flow(_.last, _.get('num'))(store.getState().backlog);
}

const endEditingStory = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(({type}) => type === 'RENAME_STORY')
    .map(action => action as RenameStoryAction)
    .map(({ num }) => actions.editStory(0));

export default combineEpics(addingNewStory, addingNewMilestone, endEditingStory, storyMigrationEpics);
