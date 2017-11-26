
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Observable } from 'rxjs/Observable';
import { ObservableInput } from 'rxjs/Observable';
import { ExecutionResult } from 'graphql';

export function query(queryBody: string, variables: {} = {}) {

  return fetch('/api/graphql', {
    method: 'POST',
    headers: [
      ['Content-Type', 'application/json'],
      ['Accept', 'application/json']
    ],
    body: JSON.stringify({
      query: queryBody,
      variables
    })
  }).then(response => response.json())
    .then(({ data }) => data);

}

// tslint:disable-next-line:no-any
export function subscribe(queryBody: string, variables: {} = {}): Observable<any> {

  const wsClient = new SubscriptionClient(`ws://${location.host}/subscriptions`, {
    reconnect: true,
    lazy: true
  });

  return Observable.from(wsClient.request({query: queryBody}) as ObservableInput<ExecutionResult>)
    .map(r => r.data);

}