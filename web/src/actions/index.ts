import { State } from '../state';
import { type, returnOf } from '../types';

let sequenceNum = 100;

export function addNewStory(title: string, size: State.StorySize = 1) {
  return { num: sequenceNum++, title, size, ...type('ADD_NEW_STORY') };
}

export function editStory(num: number) {
  return { num, ...type('EDIT_STORY') };
}

export function moveBefore(num: number, relative: number) {
  return { num, relative, ...type('MOVE_STORY_BEFORE') };
}

export function moveAfter(num: number, relative: number) {
  return { num, relative, ...type('MOVE_STORY_AFTER') };
}

export function addToSprint(num: number) {
  return { num, ...type('ADD_TO_SPRINT') };
}

export function removeFromSprint(num: number) {
  return { num, ...type('REMOVE_FROM_SPRINT') };
}

const AddNewStoryRet = returnOf(addNewStory); export type AddNewStoryAction = typeof AddNewStoryRet;
const EditStoryRet = returnOf(editStory); export type EditStoryAction = typeof EditStoryRet;
const AddToSprintRet = returnOf(addToSprint); export type AddToSprintAction = typeof AddToSprintRet;
const RemoveFromSprintRet = returnOf(removeFromSprint); export type RemoveFromSprintAction = typeof RemoveFromSprintRet;

const MoveStoryBeforeRet = returnOf(moveBefore); export type MoveStoryBeforeAction = typeof MoveStoryBeforeRet;
const MoveStoryAfterRet = returnOf(moveAfter); export type MoveStoryAfterAction = typeof MoveStoryAfterRet;

export type Action =
  | AddNewStoryAction
  | EditStoryAction
  | AddToSprintAction
  | RemoveFromSprintAction
  | MoveStoryBeforeAction
  | MoveStoryAfterAction;
