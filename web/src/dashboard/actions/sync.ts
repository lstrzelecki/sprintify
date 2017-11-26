import { State } from '../state';
import { type, returnOf } from '@utils/types';

export function storyCreatedSync(story: State.Story) {
  return { story, ...type('STORY_CREATED:SYNC') };
}

export function storyUpdatedSync(story: State.Story) {
  return { story, ...type('STORY_UPDATED:SYNC') };
}

const StoryCreatedSyncRet = returnOf(storyCreatedSync); export type StoryCreatedSyncAction = typeof StoryCreatedSyncRet;
const StoryUpdatedSyncRet = returnOf(storyUpdatedSync); export type StoryUpdatedSyncAction = typeof StoryUpdatedSyncRet;

export type Action = StoryCreatedSyncAction | StoryUpdatedSyncAction;