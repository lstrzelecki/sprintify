import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { Action } from './index';
import { type } from '../types';

const epics = (action$: Rx.Observable<Action>): Rx.Observable<Action> =>
  action$
    .filter(action => action.type === 'ADD_NEW_STORY')
    .map(action => ({ num: action.num, ...type('EDIT_STORY') }));

export default epics;