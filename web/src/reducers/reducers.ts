import {
  AddToSprintAction, ReprioritizeBacklogStoryBeforeAction, ReprioritizeBacklogStoryAfterAction, ReprioritizeSprintStoryBeforeAction,
  ReprioritizeSprintStoryAfterAction, RenameStoryAction, MoveMilestoneAfterAction, AddNewMilestoneAction, RenameMilestoneAction,
  AddNewDeadlineAction, RenameDeadlineAction, ChangeDeadlineAction, DragInProgressAction, RemoveMilestoneAction, RemoveDeadlineAction, RemoveStoryAction, InitializeDashboardAction
} from '../actions';
import { Action, AddNewStoryAction, EditStoryAction, RemoveFromSprintAction } from '../actions';

import { patch, append, nothing, matches, moveIf, forAll, removeIf } from './patch';
import { Reducer } from '../types';
import { State } from '../state';

import * as _ from 'lodash/fp';

const initializeDashboard: Reducer<State, InitializeDashboardAction> =
  ({ dashboard }) =>
    patch(dashboard);

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

const changeTitle = (title: string) => patch({ title });

const renameStory: Reducer<State, RenameStoryAction> =
  ({ num, title }) => patch({
    backlog: forAll<State.Story, State.Story>(
      changeTitle(title).onlyIf(matches({ num })).otherwise(nothing)
    )
  });

const changeName = (name: string) => patch({ name });
const changeDate = (date: string) => patch({ date });

const renameMilestone: Reducer<State, RenameMilestoneAction> =
  ({ name, newName }) => patch({
    milestones: forAll<State.Milestone, State.Milestone>(
      changeName(newName).onlyIf(matches({ name })).otherwise(nothing)
    )
  });

const renameDeadline: Reducer<State, RenameDeadlineAction> =
  ({ name, newName }) => patch({
    deadlines: forAll<State.Deadline, State.Deadline>(
      changeName(newName).onlyIf(matches({ name })).otherwise(nothing)
    )
  });

const changeDeadline: Reducer<State, ChangeDeadlineAction> =
  ({ name, newDate }) =>
    patch({
      deadlines: forAll<State.Deadline, State.Deadline>(
        changeDate(newDate).onlyIf(matches({ name })).otherwise(nothing)
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
  ({ num, relative }) =>
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

const addNewDeadline: Reducer<State, AddNewDeadlineAction> =
  ({ name }) =>
    patch({
      deadlines: append({ name, date: '' })
    });

const changeAfter = (after: number) => patch({ after });

const moveMilestoneAfter: Reducer<State, MoveMilestoneAfterAction> =
  ({ name, after }) =>
    patch({
      milestones: forAll<State.Milestone, State.Milestone>(
        changeAfter(after).onlyIf(matches({ name })).otherwise(nothing)
      )
    });

const dragInProgressStatus: Reducer<State, DragInProgressAction> =
  ({ dragInProgress }) =>
    patch({
      ui: { dragInProgress }
    });

const removeMilestone: Reducer<State, RemoveMilestoneAction> =
  ({ name }) =>
    patch({
      milestones: removeIf(matches({ name }))
    });

const removeDeadline: Reducer<State, RemoveDeadlineAction> =
  ({ name }) =>
    patch({
      deadlines: removeIf(matches({ name }))
    });

const removeStory: Reducer<State, RemoveStoryAction> =
  ({ num }) =>
    patch({
      backlog: removeIf(matches({ num })),
      currentSprint: {
        stories: removeIf(matches({ num }))
      }
    });

// helpers:

export default function reducerFor(action: Action) {
  switch (action.type) {
    case 'INITIALIZE_DASHBOARD': return initializeDashboard(action);
    case 'ADD_NEW_STORY': return addNewStory(action);
    case 'ADD_NEW_MILESTONE': return addNewMilestone(action);
    case 'ADD_NEW_DEADLINE': return addNewDeadline(action);
    case 'MOVE_MILESTONE_AFTER': return moveMilestoneAfter(action);
    case 'CHANGE_DEADLINE': return changeDeadline(action);
    case 'EDIT_STORY': return editStory(action);
    case 'RENAME_STORY': return renameStory(action);
    case 'RENAME_MILESTONE': return renameMilestone(action);
    case 'RENAME_DEADLINE': return renameDeadline(action);
    case 'REMOVE_DEADLINE': return removeDeadline(action);
    case 'REMOVE_MILESTONE': return removeMilestone(action);
    case 'REMOVE_STORY': return removeStory(action);
    case 'ADD_TO_SPRINT': return assignToSprint(action);
    case 'REMOVE_FROM_SPRINT': return removeFromSprint(action);
    case 'REPRIORITIZE_BACKLOG_STORY:BEFORE': return moveBacklogStoryBefore(action);
    case 'REPRIORITIZE_BACKLOG_STORY:AFTER': return moveBacklogStoryAfter(action);
    case 'REPRIORITIZE_SPRINT_STORY:BEFORE': return moveSprintStoryBefore(action);
    case 'REPRIORITIZE_SPRINT_STORY:AFTER': return moveSprintStoryAfter(action);
    case 'DRAG_IN_PROGRESS': return dragInProgressStatus(action);
    default: return nothing;
  }
}