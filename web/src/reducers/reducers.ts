// import { State } from '../state';
import { AddToSprintAction, MoveStoryBeforeAction, MoveStoryAfterAction } from '../actions/index';
import { Action, AddNewStoryAction, EditStoryAction, RemoveFromSprintAction } from '../actions';

import { patch, append, nothing, matches, moveIf } from './patch';
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

const moveBefore: Reducer<State, MoveStoryBeforeAction> =
  ({ num, relative}) =>
    patch({
      backlog: (array: State.Story[]): State.Story[] => {
        const idx1 = _.findIndex(matches({num}), array);
        const toMove = array.splice(idx1, 1)[0];
        const idx2 = _.findIndex(matches({num: relative}), array);
        array.splice(idx2, 0, toMove);
        return [...array];
      }
    });

const moveAfter: Reducer<State, MoveStoryAfterAction> =
  ({ num, relative }) =>
    patch({
      backlog: (array: State.Story[]): State.Story[] => {
        const idx1 = _.findIndex(matches({ num }), array);
        const toMove = array.splice(idx1, 1)[0];
        const idx2 = _.findIndex(matches({ num: relative }), array);
        array.splice(idx2 + 1, 0, toMove);
        return [...array];
      }
    });

// helpers:

export default function reducerFor(action: Action) {
  switch (action.type) {
    case 'ADD_NEW_STORY': return addNewStory(action);
    case 'EDIT_STORY': return editStory(action);
    case 'ADD_TO_SPRINT': return assignToSprint(action);
    case 'REMOVE_FROM_SPRINT': return removeFromSprint(action);
    case 'MOVE_STORY_BEFORE': return moveBefore(action);
    case 'MOVE_STORY_AFTER': return moveAfter(action);
    default: return nothing;
  }
}