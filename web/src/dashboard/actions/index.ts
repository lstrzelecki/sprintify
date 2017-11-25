
import * as domain from './domain';
export * from './domain';

import * as ui from './ui';
export * from './ui';

import * as navigation from './navigation';

export type Action =
  | domain.Action
  | ui.Action
  | navigation.Action;