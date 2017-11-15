import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import storyMigrationEpics from './story-migration-epics';

import * as actions from './index';

import { Action } from './index';
import { combineEpics } from 'redux-observable';

const addingNewStory = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(({type}) => type === 'ADD_NEW_STORY')
    .map(({num}) => actions.editStory(num));

const endEditingStory = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(({ type }) => type === 'CHANGE_STORY_TITLE')
    .map(({ num }) => actions.editStory(0));

export default combineEpics(addingNewStory, endEditingStory, storyMigrationEpics);
