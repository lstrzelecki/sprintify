import * as _ from 'lodash';
import * as moment from 'moment';
import { State } from './index';
import { Moment } from 'moment';
const business = require('moment-business');

type MilestoneWithEstimation = State.Milestone & State.Estimation;

export default function calculateDeadlines(sprint: State.Sprint, backlog: State.Backlog, milestones: State.Milestone[]): MilestoneWithEstimation[] {

  const velocityPerSprint = _.sumBy(sprint.stories, 'size');
  const velocityPerDay = velocityPerSprint / 5;

  const estimations = _.reduce(backlog, (acc, story) => {

    let {date} = _.last(acc) as {date: Moment};
    date = business.addWeekDays(date.clone(), (story.size / velocityPerDay));

    return [...acc, {num: story.num, date}];

  },                           [{ num: _.head(backlog), date: moment(sprint.end) }]);

  console.log('estimating milestones', velocityPerDay, estimations);

  return _.map(milestones, m => {
    const { date } = _.find(estimations, { num: m.after }) as { date: Moment };
    return { ...m, date: date.format('YYYY-MM-DD') };
  });
}