import * as _ from 'lodash/fp';
import client from '../elasticsearch';

export default {
  currentSprint: () => {
    return client.search({
      index: 'sprints',
      type: 'sprint'
    })
    .then(({ hits }) => hits)
    .then(({ hits }) => hits)
    .then(_.map('_source'))
    .then(_.first);
  }
};