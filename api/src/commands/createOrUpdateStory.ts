import * as _ from 'lodash/fp';
import client from '../elasticsearch';

import { PubSub } from 'graphql-subscriptions';

interface Story {
  num: string;
  title: string;
  size: number;
}

interface Sprint {
  stories: Story[];
}

interface Variables {
  story: Story;
}

interface Context {
  queue: PubSub;
}

export default {

  createStory: (omit: never, { story }: Variables, { queue }: Context) => {

    return client.index({
      index: 'backlog',
      type: 'story',
      id: story.num,
      body: story,
      refresh: 'true'
    })
      .then(_.props(['_id']))
      .then(_.zipObject(['num']))
      .then(storyCreated);

    function storyCreated<T>(val: T): T {
      queue.publish('dashboardUpdates', { dashboardUpdates: {...story, event: 'StoryCreatedEvent' } });
      return val;
    }
  },

  updateStory: (omit: never, { story }: Variables, { queue }: Context) => {

    return client.update({
      index: 'backlog',
      type: 'story',
      id: story.num,
      body: {
        doc: story,
      },
      refresh: true
    })
      .catch(() => updateInSprint(story))   // story is in sprint
      .then(_.props(['_id']))
      .then(_.zipObject(['num']))
      .then(storyUpdated);

    function storyUpdated<T>(val: T): T {
      queue.publish('dashboardUpdates', { dashboardUpdates: { ...story, event: 'StoryUpdatedEvent' } });
      return val;
    }
  }

};

function updateInSprint(story: Story) {

  return client.search<Sprint>({
    index: 'sprints',
    type: 'sprint',
    body: {
      query: {
        term: { 'stories.num': story.num }
      }
    }
  })
    .then(({ hits }) => hits)
    .then(({ hits }) => hits[0])
    .then(({ _id, _source }) => client.update({
      index: 'sprints',
      type: 'sprint',
      id: _id,
      body: {
        doc: {
          stories: _source.stories.map(s => s.num === story.num ? {...s, ...story} : s)
        }
      }
    }));

}

