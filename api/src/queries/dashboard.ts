import * as _ from 'lodash/fp';
import client from '../elasticsearch';
import backlog from './backlog';
import milestones from './milestones';
import deadlines from './deadlines';
import currentSprint from './sprint';

export default {
  dashboard: {
    ...backlog,
    ...milestones,
    ...deadlines,
    ...currentSprint
  }
};