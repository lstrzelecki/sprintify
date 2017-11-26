
import * as domain from './domain';
export * from './domain';

import * as sync from './sync';
export * from './sync';

import * as ui from './ui';
export * from './ui';

import * as navigation from './navigation';

export type Action =
  | domain.Action
  | sync.Action
  | ui.Action
  | navigation.Action;