// import { State } from '../state';
import { AddToSprintAction } from '../actions/index';
import { Action, AddNewStoryAction, EditStoryAction, RemoveFromSprintAction } from '../actions';

import { patch, append, nothing, matches, moveIf } from './patch';
import { Reducer } from '../types';
import { State } from '../state';

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
  ({num}) => {

  let { from, to } = moveIf(matches({ num }));

  return patch({
      backlog: from,
      currentSprint: {
        stories: to
      }
    } as any);

  };

const removeFromSprint: Reducer<State, RemoveFromSprintAction> =
  ({ num }) => {

    let { from, to } = moveIf(matches({ num }));

    return patch({
      currentSprint: {
        stories: from
      },
      backlog: to
    } as any);

  };


// helpers:

export default function reducerFor(action: Action) {
  switch (action.type) {
    case 'ADD_NEW_STORY': return addNewStory(action);
    case 'EDIT_STORY': return editStory(action);
    case 'ADD_TO_SPRINT': return assignToSprint(action);
    case 'REMOVE_FROM_SPRINT': return removeFromSprint(action);
    default: return nothing;
  }
}