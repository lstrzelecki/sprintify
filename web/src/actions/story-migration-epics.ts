import * as _ from 'lodash/fp';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import * as actions from './index';
import { Action, MoveStoryAfterAction, MoveStoryBeforeAction } from './index';

import { Store } from 'react-redux';
import { State } from '../state';
import { combineEpics } from 'redux-observable';

type MoveStoryAction = MoveStoryBeforeAction | MoveStoryAfterAction;

const reprioritizeInBacklog = ({ num, relative, type }: MoveStoryAction) => type.endsWith('BEFORE') ?
  actions.reprioritizeBacklogStoryBefore(num, relative) :
  actions.reprioritizeBacklogStoryAfter(num, relative);

const reprioritizeInSprint = ({ num, relative, type }: MoveStoryAction) => type.endsWith('BEFORE') ?
  actions.reprioritizeSprintStoryBefore(num, relative) :
  actions.reprioritizeSprintStoryAfter(num, relative);

const assignToSprint = ({ num }: MoveStoryAction) => actions.addToSprint(num);
const removeFromSprint = ({ num }: MoveStoryAction) => actions.removeFromSprint(num);

const moveStory = moveActions();

const movingStoriesWithinBacklog = moveStory.from(backlog).to(backlog).translatesTo(reprioritizeInBacklog);
const movingStoriesWithinSprint = moveStory.from(sprint).to(sprint).translatesTo(reprioritizeInSprint);
const movingStoriesIntoSprint = moveStory.from(backlog).to(sprint).translatesTo(assignToSprint, reprioritizeInSprint);
const movingStoriesOutsideSprint = moveStory.from(sprint).to(backlog).translatesTo(removeFromSprint, reprioritizeInBacklog);

export default combineEpics(
  movingStoriesWithinBacklog,
  movingStoriesWithinSprint,
  movingStoriesIntoSprint,
  movingStoriesOutsideSprint
);

// -- helpers:

function backlog(store: Store<State>): (num: number) => boolean {
  return num => {
    const stories = store.getState().backlog;
    return !_.isUndefined(_.find({ num }, stories));
  };
}

function sprint(store: Store<State>): (num: number) => boolean {
  return num => {
    const stories = store.getState().currentSprint.stories;
    return !_.isUndefined(_.find({ num }, stories));
  };
}

interface Selector {
  (store: Store<State>): (num: number) => boolean;
}

interface Target {
  (action: MoveStoryAction): Action;
}

function moveActions() {
  return {
    from(source: Selector) {
      return {
        to(target: Selector) {
          return {
            translatesTo(...targets: Target[]) {
              return (action$: Rx.Observable<Action>, store: Store<State>) =>
                action$
                  .filter(({ type }) => type.startsWith('MOVE_STORY'))
                  .map(action => action as MoveStoryAction)
                  .filter(({ num }) => source(store)(num))
                  .filter(({ relative }) => target(store)(relative))
                  .flatMap(action => Rx.Observable.from(targets).map(fn => fn(action)));
            }
          };
        }
      };
    }
  };
}