import * as _ from 'lodash/fp';
import client from '../elasticsearch';

import { PubSub } from 'graphql-subscriptions';

interface Context {
  queue: PubSub;
}

export default {
  dashboardUpdates: (omit: never, { queue }: Context) => {
    return queue.asyncIterator('dashboardUpdates');
  }
};
