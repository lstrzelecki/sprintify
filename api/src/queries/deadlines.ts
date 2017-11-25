import * as _ from 'lodash/fp';
import client from '../elasticsearch';

export default {
  deadlines: () => {
    return client.search({
      index: 'backlog',
      type: 'deadline'
    })
    .then(({ hits }) => hits)
    .then(({ hits }) => hits)
    .then(_.map('_source'));
  }
};