import * as _ from 'lodash';
import { State } from './index';
import * as moment from 'moment';
const business = require('moment-business');

export default function calculateMarkers(sprint: State.Sprint, backlog: State.Backlog, milestones: State.Milestone[], deadlines: State.Deadline[]): State.Marker[] {

  return [...predictMilestones(sprint, backlog, milestones),
          ...estimateDeadlines(sprint, backlog, deadlines)];
}

export function predictMilestones(sprint: State.Sprint, backlog: State.Backlog, milestones: State.Milestone[]) {

  const velocityPerSprint = _.sumBy(sprint.stories, 'size');
  const velocityPerDay = velocityPerSprint / 5;

  const estimations = estimateStories(backlog, velocityPerDay, sprint.end);

  return _.map(milestones, m => {
    const { date } = _.find(estimations, { num: m.after }) || { date: sprint.end};
    return { ...m, date: date, type: 'milestone' } as State.Marker;
  });
}

export function estimateDeadlines(sprint: State.Sprint, backlog: State.Backlog, deadlines: State.Deadline[]) {

  const velocityPerSprint = _.sumBy(sprint.stories, 'size');
  const velocityPerDay = velocityPerSprint / 5;

  const estimations = estimateStories(backlog, velocityPerDay, sprint.end);

  return _.map(deadlines, d => {
    const { num } = _.findLast(estimations, s => s.date < d.date ) || _.last(estimations) || { num: -1 };
    return { ...d, after: num, type: 'deadline' } as State.Marker;
  });
}

function estimateStories(stories: State.Backlog, velocityPerDay: number, start: string) {

  type StoryEstimation = { num: number; date: string; };

  const reducer = (acc: StoryEstimation[], story: State.Story) => {
    let { date } = _.last(acc) as StoryEstimation;
    date = business.addWeekDays(moment(date), (story.size / velocityPerDay)).format('YYYY-MM-DD');
    return [...acc, { num: story.num, date }];
  };

  if (!stories.length) {
    return [];
  }

  const [{num}] = stories;
  return _.reduce(stories, reducer, [{ num, date: start }]);
}
