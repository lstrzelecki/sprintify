import { combineEpics } from 'redux-observable';

import storyMigration from './story-migration';
import serverSync from './server-sync';
import backlogEditing from './backlog-editing';

export default combineEpics(backlogEditing, storyMigration, serverSync);
