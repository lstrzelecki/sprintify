import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { Action } from '../dashboard/actions';

declare module 'rxjs/Observable' {
  interface Observable<T> {
    fromType: typeof fromType;
  }
}
Rx.Observable.prototype.fromType = fromType;

export default function fromType<A extends Action>(this: Rx.Observable<Action>, expectedType: A['type']): Rx.Observable<A> {
  return this
      .filter(({ type }) => type === expectedType)
      .map(action => action as A);
}
