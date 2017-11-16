import { State } from '../state';
import { type, returnOf } from '../types';

let sequenceNum = 100;

export function addNewStory(title: string, size: State.StorySize = 1) {
  return { num: sequenceNum++, title, size, ...type('ADD_NEW_STORY') };
}

export function addNewMilestone(name: string) {
  return { name, ...type('ADD_NEW_MILESTONE') };
}

export function editStory(num: number) {
  return { num, ...type('EDIT_STORY') };
}

export function renameStory(num: number, title: string) {
  return { num, title, ...type('RENAME_STORY') };
}

export function renameMilestone(name: string, newName: string) {
  return { name, newName, ...type('RENAME_MILESTONE') };
}

export function moveBefore(num: number, relative: number) {
  return { num, relative, ...type('MOVE_STORY_BEFORE') };
}

export function moveAfter(num: number, relative: number) {
  return { num, relative, ...type('MOVE_STORY_AFTER') };
}

export function moveMilestoneAfter(name: string, after: number) {
  return { name, after, ...type('MOVE_MILESTONE_AFTER') };
}

export function reprioritizeBacklogStoryAfter(num: number, relative: number) {
  return { num, relative, ...type('REPRIORITIZE_BACKLOG_STORY:AFTER') };
}

export function reprioritizeBacklogStoryBefore(num: number, relative: number) {
  return { num, relative, ...type('REPRIORITIZE_BACKLOG_STORY:BEFORE') };
}

export function reprioritizeSprintStoryAfter(num: number, relative: number) {
  return { num, relative, ...type('REPRIORITIZE_SPRINT_STORY:AFTER') };
}

export function reprioritizeSprintStoryBefore(num: number, relative: number) {
  return { num, relative, ...type('REPRIORITIZE_SPRINT_STORY:BEFORE') };
}

export function addToSprint(num: number) {
  return { num, ...type('ADD_TO_SPRINT') };
}

export function removeFromSprint(num: number) {
  return { num, ...type('REMOVE_FROM_SPRINT') };
}

const AddNewStoryRet = returnOf(addNewStory); export type AddNewStoryAction = typeof AddNewStoryRet;
const AddNewMilestoneRet = returnOf(addNewMilestone); export type AddNewMilestoneAction = typeof AddNewMilestoneRet;
const EditStoryRet = returnOf(editStory); export type EditStoryAction = typeof EditStoryRet;
const RenameStoryRet = returnOf(renameStory); export type RenameStoryAction = typeof RenameStoryRet;
const RenameMilestoneRet = returnOf(renameMilestone); export type RenameMilestoneAction = typeof RenameMilestoneRet;

const AddToSprintRet = returnOf(addToSprint); export type AddToSprintAction = typeof AddToSprintRet;
const RemoveFromSprintRet = returnOf(removeFromSprint); export type RemoveFromSprintAction = typeof RemoveFromSprintRet;

const MoveStoryBeforeRet = returnOf(moveBefore); export type MoveStoryBeforeAction = typeof MoveStoryBeforeRet;
const MoveStoryAfterRet = returnOf(moveAfter); export type MoveStoryAfterAction = typeof MoveStoryAfterRet;

const MoveMilestoneAfterRet = returnOf(moveMilestoneAfter); export type MoveMilestoneAfterAction = typeof MoveMilestoneAfterRet;

const ReprioritizeBacklogStoryAfterRet = returnOf(reprioritizeBacklogStoryAfter); export type ReprioritizeBacklogStoryAfterAction = typeof ReprioritizeBacklogStoryAfterRet;
const ReprioritizeBacklogStoryBeforeRet = returnOf(reprioritizeBacklogStoryBefore); export type ReprioritizeBacklogStoryBeforeAction = typeof ReprioritizeBacklogStoryBeforeRet;

const ReprioritizeSprintStoryAfterRet = returnOf(reprioritizeSprintStoryAfter); export type ReprioritizeSprintStoryAfterAction = typeof ReprioritizeSprintStoryAfterRet;
const ReprioritizeSprintStoryBeforeRet = returnOf(reprioritizeSprintStoryBefore); export type ReprioritizeSprintStoryBeforeAction = typeof ReprioritizeSprintStoryBeforeRet;

export type Action =
  | AddNewStoryAction
  | AddNewMilestoneAction
  | MoveMilestoneAfterAction
  | EditStoryAction
  | AddToSprintAction
  | RemoveFromSprintAction
  | MoveStoryBeforeAction
  | MoveStoryAfterAction
  | ReprioritizeBacklogStoryAfterAction
  | ReprioritizeBacklogStoryBeforeAction
  | ReprioritizeSprintStoryAfterAction
  | ReprioritizeSprintStoryBeforeAction
  | RenameStoryAction
  | RenameMilestoneAction;
