import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import '@utils/epics';

import { Action, initializeDashboard, RenameStoryAction, AddNewStoryAction, storyCreatedSync, storyUpdatedSync } from '../actions';

import { query, subscribe } from '@utils/graphql';
import { LOCATION_CHANGE, LocationChangeAction } from 'react-router-redux';
import { combineEpics } from 'redux-observable';
import { matches } from '@utils/patch';

const loadDashboard = (action$: Rx.Observable<Action>) =>
  action$
    .fromType<LocationChangeAction>(LOCATION_CHANGE)
    .filter(({ payload: location }) => location.pathname === '/dashboard')
    .flatMap(() => query(queryForDashboard).then(({ dashboard }) => initializeDashboard(dashboard)));

const subscribeForUpdates = (action$: Rx.Observable<Action>) =>
  action$
    .fromType<LocationChangeAction>(LOCATION_CHANGE)
    .filter(({ payload: location }) => location.pathname === '/dashboard')
    // tslint:disable-next-line:no-any
    .flatMap(() => subscribe(subscribeForUpdatesSubscription).map(({ dashboardUpdates }) => dashboardUpdates))
    .do(console.log)
    .map((event) => {
      if (event.type === 'StoryCreatedEvent') {
        return storyCreatedSync(event);
      }
      if (event.type === 'StoryUpdatedEvent') {
        return storyUpdatedSync(event);
      }
      throw `Unknown event type: ${event.type}`;
    });

const createStory = (action$: Rx.Observable<Action>) =>
  action$
    .fromType<AddNewStoryAction>('ADD_NEW_STORY')
    .flatMap(({ num }) => action$.fromType('RENAME_STORY').filter(matches({ num })).take(1))
    .flatMap(({ num, title }) => query(createStoryMutation, { story: { num, title } }))
    .ignoreElements();

const updateStory = (action$: Rx.Observable<Action>) =>
  action$
    .fromType<RenameStoryAction>('RENAME_STORY')
    .flatMap(({ num, title }) => query(updateStoryMutation, { story: { num, title } }))
    .ignoreElements();

export default combineEpics(loadDashboard, createStory, updateStory, subscribeForUpdates);

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

const updateStoryMutation = `
mutation UpdateStory($story: StoryInput) {
  updateStory(story: $story) {
    num
  }
}`;

const createStoryMutation = `
mutation CreateStory($story: StoryInput) {
  createStory(story: $story) {
    num
  }
}`;

const subscribeForUpdatesSubscription = `
subscription DashboardUpdates {
  dashboardUpdates {
    type: __typename
    ... on StoryUpdatedEvent {
      num
      title
      size
    }
    ... on StoryCreatedEvent {
      num
      title
      size
    }
  }
}`;