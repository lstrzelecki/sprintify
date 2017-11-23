const elasticsearch = require('elasticsearch');
const _ = require('lodash');
const moment = require('moment');

const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';

const client = new elasticsearch.Client({
  host: `${elasticsearchHost}:9200`
});

let lastId = 1;

const stories = [
  story('Changing velocity', 2),
  story('Closing Sprint', 2),
  story('Setup of backend'),
  story('Sync with GraphQL endpoints', 2),
  story('Storage in Elasticsearch'),
  story('Stories On Board integration', 3),
  story('Support for Milestones', 2),
  story('Support for Deadlines', 2),
  story('Removing Stories'),
  story('Removing Milestones'),
  story('Removing Deadlines'),
  story('Sync progress indicator', 2),
  story('GraphQL subscriptions', 3),
  story('AWS Lambda deployment', 3)
];

indexBacklog(stories);

function indexBacklog(documents) {

  return truncateBacklog().then(bulkIndexStories);

  function truncateBacklog() {
    return client.indices.delete({
      index: 'profiles'
    }).catch(err => Promise.resolve('OK'));
  }

  function bulkIndexStories() {
    return client.bulk({
      index: 'backlog',
      type: 'story',
      refresh: true,
      // body: documents
      body: _.flatMap(documents, d => [{ index: {} }, d])
    });
  }
}

function story(title, size = 1) {
  return { num: lastId++, title, size };
};
