import { State } from '../state';
import { type, returnOf } from '../types';

let sequenceNum = 100;

export function addNewStory(title: string, size: State.StorySize = 1) {
  return { num: sequenceNum++, title, size, ...type('ADD_NEW_STORY') };
}

export function editStory(num: number) {
  return { num, ...type('EDIT_STORY') };
}

const AddNewStoryRet = returnOf(addNewStory); export type AddNewStoryAction = typeof AddNewStoryRet;
const EditStoryRet = returnOf(editStory); export type EditStoryAction = typeof EditStoryRet;

export type Action =
  | AddNewStoryAction
  | EditStoryAction;
