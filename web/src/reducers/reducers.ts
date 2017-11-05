// import { State } from '../state';
import { Action, AddNewStoryAction, EditStoryAction } from '../actions';

import { patch, append, nothing } from './patch';
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

// helpers:

export default function reducerFor(action: Action) {
  switch (action.type) {
    case 'ADD_NEW_STORY': return addNewStory(action);
    case 'EDIT_STORY': return editStory(action);
    default: return nothing;
  }
}