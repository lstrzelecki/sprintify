// import { State } from '../state';
import { AddToSprintAction, ReprioritizeBacklogStoryBeforeAction,
  ReprioritizeBacklogStoryAfterAction, ReprioritizeSprintStoryBeforeAction, ReprioritizeSprintStoryAfterAction, ChangeStoryTitleAction, MoveMilestoneAfterAction, AddNewMilestoneAction } from '../actions';
import { Action, AddNewStoryAction, EditStoryAction, RemoveFromSprintAction } from '../actions';

import { patch, append, nothing, matches, moveIf, forAll } from './patch';
import { Reducer } from '../types';
import { State } from '../state';

import * as _ from 'lodash/fp';

const addNewStory: Reducer<State, AddNewStoryAction> =
  ({ num, title, size }) =>
    patch({
      backlog: append({ num, title, size })
    });

const editStory: Reducer<State, EditStoryAction> =
  ({ num }) =>
    patch({
      edited: num
    });

const changeTitle = (title: string) => patch({title});

const updateStory: Reducer<State, ChangeStoryTitleAction> =
  ({ num, title }) => patch({
    backlog: forAll<State.Story, State.Story>(
      changeTitle(title).onlyIf(matches({ num })).otherwise(nothing)
    )
  });

const assignToSprint: Reducer<State, AddToSprintAction> =
  ({ num }, { from, to } = moveIf(matches({ num }))) =>
    patch({
      backlog: from,
      currentSprint: { stories: to }
    });

const removeFromSprint: Reducer<State, RemoveFromSprintAction> =
  ({ num }, { from, to } = moveIf(matches({ num }))) =>
    patch({
      backlog: to,
      currentSprint: { stories: from }
    });

function moveRelativeTo(num: number, relative: number, relation: 'before' | 'after') {
  return (array: State.Story[]): State.Story[] => {

    if (num === relative) {
      return array;
    }

    const idx1 = _.findIndex(matches({ num }), array);
    const toMove = array.splice(idx1, 1)[0];
    const idx2 = _.findIndex(matches({ num: relative }), array);
    array.splice(idx2 + (relation === 'before' ? 0 : 1), 0, toMove);
    return [...array];
  };
}

const moveBacklogStoryBefore: Reducer<State, ReprioritizeBacklogStoryBeforeAction> =
  ({ num, relative}) =>
    patch({
      backlog: moveRelativeTo(num, relative, 'before')
    });

const moveBacklogStoryAfter: Reducer<State, ReprioritizeBacklogStoryAfterAction> =
  ({ num, relative }) =>
    patch({
      backlog: moveRelativeTo(num, relative, 'after')
    });

const moveSprintStoryBefore: Reducer<State, ReprioritizeSprintStoryBeforeAction> =
  ({ num, relative }) =>
    patch({
      currentSprint: {
        stories: moveRelativeTo(num, relative, 'before')
      }
    });

const moveSprintStoryAfter: Reducer<State, ReprioritizeSprintStoryAfterAction> =
  ({ num, relative }) =>
    patch({
      currentSprint: {
        stories: moveRelativeTo(num, relative, 'after')
      }
    });

const addNewMilestone: Reducer<State, AddNewMilestoneAction> =
  ({ name }) =>
    patch({
      milestones: append({ name, after: 1 })
    });

const changeAfter = (after: number) => patch({after});

const moveMilestoneAfter: Reducer<State, MoveMilestoneAfterAction> =
  ({ name, after }) =>
    patch({
      milestones: forAll<State.Milestone, State.Milestone>(
        changeAfter(after).onlyIf(matches({name})).otherwise(nothing)
      )
    });

// helpers:

export default function reducerFor(action: Action) {
  switch (action.type) {
    case 'ADD_NEW_STORY': return addNewStory(action);
    case 'ADD_NEW_MILESTONE': return addNewMilestone(action);
    case 'MOVE_MILESTONE_AFTER': return moveMilestoneAfter(action);
    case 'EDIT_STORY': return editStory(action);
    case 'CHANGE_STORY_TITLE': return updateStory(action);
    case 'ADD_TO_SPRINT': return assignToSprint(action);
    case 'REMOVE_FROM_SPRINT': return removeFromSprint(action);
    case 'REPRIORITIZE_BACKLOG_STORY:BEFORE': return moveBacklogStoryBefore(action);
    case 'REPRIORITIZE_BACKLOG_STORY:AFTER': return moveBacklogStoryAfter(action);
    case 'REPRIORITIZE_SPRINT_STORY:BEFORE': return moveSprintStoryBefore(action);
    case 'REPRIORITIZE_SPRINT_STORY:AFTER': return moveSprintStoryAfter(action);
    default: return nothing;
  }
}