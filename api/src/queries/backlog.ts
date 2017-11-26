import * as _ from 'lodash/fp';
import client from '../elasticsearch';

export default {
  backlog: () => {
    return client.search({
      index: 'backlog',
      type: 'story',
      size: 1000
    })
    .then(({ hits }) => hits)
    .then(({ hits }) => hits)
    .then(_.map('_source'));
  }
};