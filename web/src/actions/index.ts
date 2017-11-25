import { State } from '../state';
import { type, returnOf } from '../types';
import { LOCATION_CHANGE } from 'react-router-redux';
import { Location } from 'history';

import * as ui from './ui';
export * from './ui';

let sequenceNum = 100;

export function initializeDashboard(dashboard: State.Dashboard) {
  return { dashboard, ...type('INITIALIZE_DASHBOARD') };
}

export function addNewStory(title: string, size: State.StorySize = 1) {
  return { num: sequenceNum++, title, size, ...type('ADD_NEW_STORY') };
}

export function addNewMilestone(name: string) {
  return { name, ...type('ADD_NEW_MILESTONE') };
}

export function addNewDeadline(name: string) {
  return { name, ...type('ADD_NEW_DEADLINE') };
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

export function renameDeadline(name: string, newName: string) {
  return { name, newName, ...type('RENAME_DEADLINE') };
}

export function changeDeadline(name: string, newDate: string) {
  return { name, newDate, ...type('CHANGE_DEADLINE') };
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

export function removeStory(num: number) {
  return { num, ...type('REMOVE_STORY') };
}

export function removeMilestone(name: string) {
  return { name, ...type('REMOVE_MILESTONE') };
}

export function removeDeadline(name: string) {
  return { name, ...type('REMOVE_DEADLINE') };
}

const InitializeDashboardRet = returnOf(initializeDashboard); export type InitializeDashboardAction = typeof InitializeDashboardRet;

const AddNewStoryRet = returnOf(addNewStory); export type AddNewStoryAction = typeof AddNewStoryRet;
const AddNewMilestoneRet = returnOf(addNewMilestone); export type AddNewMilestoneAction = typeof AddNewMilestoneRet;
const AddNewDeadlineRet = returnOf(addNewDeadline); export type AddNewDeadlineAction = typeof AddNewDeadlineRet;
const EditStoryRet = returnOf(editStory); export type EditStoryAction = typeof EditStoryRet;
const RenameStoryRet = returnOf(renameStory); export type RenameStoryAction = typeof RenameStoryRet;
const RenameMilestoneRet = returnOf(renameMilestone); export type RenameMilestoneAction = typeof RenameMilestoneRet;
const RenameDeadlineRet = returnOf(renameDeadline); export type RenameDeadlineAction = typeof RenameDeadlineRet;

const RemoveDeadlineRet = returnOf(removeDeadline); export type RemoveDeadlineAction = typeof RemoveDeadlineRet;
const RemoveMilestoneRet = returnOf(removeMilestone); export type RemoveMilestoneAction = typeof RemoveMilestoneRet;
const RemoveStoryRet = returnOf(removeStory); export type RemoveStoryAction = typeof RemoveStoryRet;

const AddToSprintRet = returnOf(addToSprint); export type AddToSprintAction = typeof AddToSprintRet;
const RemoveFromSprintRet = returnOf(removeFromSprint); export type RemoveFromSprintAction = typeof RemoveFromSprintRet;

const MoveStoryBeforeRet = returnOf(moveBefore); export type MoveStoryBeforeAction = typeof MoveStoryBeforeRet;
const MoveStoryAfterRet = returnOf(moveAfter); export type MoveStoryAfterAction = typeof MoveStoryAfterRet;

const MoveMilestoneAfterRet = returnOf(moveMilestoneAfter); export type MoveMilestoneAfterAction = typeof MoveMilestoneAfterRet;
const ChangeDeadlineRet = returnOf(changeDeadline); export type ChangeDeadlineAction = typeof ChangeDeadlineRet;

const ReprioritizeBacklogStoryAfterRet = returnOf(reprioritizeBacklogStoryAfter); export type ReprioritizeBacklogStoryAfterAction = typeof ReprioritizeBacklogStoryAfterRet;
const ReprioritizeBacklogStoryBeforeRet = returnOf(reprioritizeBacklogStoryBefore); export type ReprioritizeBacklogStoryBeforeAction = typeof ReprioritizeBacklogStoryBeforeRet;

const ReprioritizeSprintStoryAfterRet = returnOf(reprioritizeSprintStoryAfter); export type ReprioritizeSprintStoryAfterAction = typeof ReprioritizeSprintStoryAfterRet;
const ReprioritizeSprintStoryBeforeRet = returnOf(reprioritizeSprintStoryBefore); export type ReprioritizeSprintStoryBeforeAction = typeof ReprioritizeSprintStoryBeforeRet;

type LocationChangeAction = { type: typeof LOCATION_CHANGE, payload: Location };

export type Action =
  | LocationChangeAction
  | InitializeDashboardAction
  | AddNewStoryAction
  | AddNewMilestoneAction
  | AddNewDeadlineAction
  | MoveMilestoneAfterAction
  | ChangeDeadlineAction
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
  | RenameMilestoneAction
  | RenameDeadlineAction
  | RemoveDeadlineAction
  | RemoveMilestoneAction
  | RemoveStoryAction
  | ui.DragInProgressAction;
