const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const moment = require('moment');

const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';

const client = new elasticsearch.Client({
  host: `${elasticsearchHost}:9200`
});

let lastId = 1;

const currentSprint = {
  type: 'sprint',
  start: '2017-11-10',
  end: '2017-11-17',
  stories: [
    story('Data model as ADT'),
    story('Initial layout', 2),
    story('Fluent grid layout', 2),
    story('Adding new Story'),
    story('Re-prioritizing Story', 2)
  ].map(s => _.omit(s, ['type']))
};

const stories = [
  story('Changing velocity', 2),
  story('Closing Sprint', 2),
  story('Setup of backend'),
  story('Sync with GraphQL endpoints', 2),
  story('Storage in Elasticsearch'),
  story('Stories On Board integration', 3),
  story('Support for Milestones', 2),
  story('Support for Deadlines', 2),

  milestone('MVP'),

  story('Removing Stories'),
  story('Removing Milestones'),
  story('Removing Deadlines'),
  story('Sync progress indicator', 2),
  story('GraphQL subscriptions', 3),
  story('AWS Lambda deployment', 3),

  deadline('Release window', '2017-12-20')
];

indexSprints([currentSprint]).catch(console.log);
indexBacklog(stories);

function indexBacklog(documents) {

  return truncateBacklog().then(bulkIndexStories);

  function truncateBacklog() {
    return client.indices.delete({
      index: 'backlog'
    }).catch(err => Promise.resolve('OK'));
  }

  function bulkIndexStories() {
    return client.bulk({
      index: 'backlog',
      refresh: true,
      // body: documents
      body: _.flatMap(documents, d => [{ index: { _type: d.type } }, _.omit(d, ['type'])])
    });
  }
}

function indexSprints(documents) {

  return truncateSprints().then(bulkIndexSprints);

  function truncateSprints() {
    return client.indices.delete({
      index: 'sprints'
    }).catch(err => Promise.resolve('OK'));
  }

  function bulkIndexSprints() {
    return client.bulk({
      index: 'sprints',
      refresh: true,
      // body: documents
      body: _.flatMap(documents, d => [{ index: { _type: d.type } }, _.omit(d, ['type'])])
    });
  }
}


function story(title, size = 1) {
  return { num: lastId++, title, size, type: 'story' };
}

function milestone(name) {
  return { name, after: lastId, type: 'milestone' };
}

function deadline(name, date) {
  return { name, date, type: 'deadline' };
}
