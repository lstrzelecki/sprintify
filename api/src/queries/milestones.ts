import * as _ from 'lodash/fp';
import client from '../elasticsearch';

export default {
  milestones: () => {
    return client.search({
      index: 'backlog',
      type: 'milestone'
    })
    .then(({ hits }) => hits)
    .then(({ hits }) => hits)
    .then(_.map('_source'));
  }
};