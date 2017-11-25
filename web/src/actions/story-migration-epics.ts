import * as _ from 'lodash/fp';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/concatAll';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import * as actions from './index';
import { Action, MoveStoryAfterAction, MoveStoryBeforeAction } from './index';

import { Store } from 'react-redux';
import { State } from '../state';
import { combineEpics } from 'redux-observable';
import { matches } from '../reducers/patch';

type MoveStoryAction = MoveStoryBeforeAction | MoveStoryAfterAction;

const reprioritizeInBacklog = ({ num, relative, type }: MoveStoryAction) => type.endsWith('BEFORE') ?
  Rx.Observable.of(actions.reprioritizeBacklogStoryBefore(num, relative)) :
  Rx.Observable.of(actions.reprioritizeBacklogStoryAfter(num, relative));

const reprioritizeInSprint = ({ num, relative, type }: MoveStoryAction) => type.endsWith('BEFORE') ?
  Rx.Observable.of(actions.reprioritizeSprintStoryBefore(num, relative)) :
  Rx.Observable.of(actions.reprioritizeSprintStoryAfter(num, relative));

const adjustMilestones = ({ num, relative }: MoveStoryAction, {milestones, backlog: stories}: State) => {

  if (num === relative) {
    return Rx.Observable.empty() as Rx.Observable<Action>;
  }

  const previousStoryNum = () => {
    const prevIndex = _.findIndex(matches({ num }), stories) - 1;
    if (prevIndex < 0) {
      return num;
    }
    return stories[prevIndex].num;
  };

  return Rx.Observable.from(milestones)
    .filter(matches({after: num}))
    .map(m => actions.moveMilestoneAfter(m.name, previousStoryNum()));
};

const assignToSprint = ({ num }: MoveStoryAction) => Rx.Observable.of(actions.addToSprint(num));
const removeFromSprint = ({ num }: MoveStoryAction) => Rx.Observable.of(actions.removeFromSprint(num));

const moveStory = moveActions();

const movingStoriesWithinBacklog = moveStory.from(backlog).to(backlog).translatesTo(adjustMilestones, reprioritizeInBacklog);
const movingStoriesWithinSprint = moveStory.from(sprint).to(sprint).translatesTo(adjustMilestones, reprioritizeInSprint);
const movingStoriesIntoSprint = moveStory.from(backlog).to(sprint).translatesTo(adjustMilestones, assignToSprint, reprioritizeInSprint);
const movingStoriesOutsideSprint = moveStory.from(sprint).to(backlog).translatesTo(adjustMilestones, removeFromSprint, reprioritizeInBacklog);

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
  (action: MoveStoryAction, state: State): Rx.Observable<Action>;
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
                  .flatMap(action => Rx.Observable.from(targets).flatMap(fn => fn(action, store.getState())));
            }
          };
        }
      };
    }
  };
}