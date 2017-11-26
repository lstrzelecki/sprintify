const elasticsearch = require('elasticsearch');

const mappings = [{
  "template": "backlog",
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "story": {
      "dynamic": "strict",
      "properties": {
        "num":    { "type": "keyword" },
        "title":  { "type": "text" },
        "size":   { "type": "integer" }
      }
    },
    "milestone": {
      "dynamic": "strict",
      "properties": {
        "num":    { "type": "keyword" },
        "name":   { "type": "text" },
        "after":  { "type": "integer" }
      }
    },
    "deadline": {
      "dynamic": "strict",
      "properties": {
        "num":    { "type": "keyword" },
        "name":   { "type": "text" },
        "date":   { "type": "date" }
      }
    }
  }
}, {
  "template": "sprints",
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "sprint": {
      "dynamic": "strict",
      "properties": {
        "start": { "type": "date" },
        "end":   { "type": "date"    },
        "stories":  {
          "properties": {
            "num":    { "type": "integer" },
            "title":  { "type": "text" },
            "size":   { "type": "integer" }
          }
        }
      }
    }
  }
}];

createSchema();

function createSchema() {

  const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';

  const client = new elasticsearch.Client({
    host: `${elasticsearchHost}:9200`
  });

  Promise.all(mappings.map(createTemplate))
    .then(function () {
      console.log('*** Schema created!');
    });

  function createTemplate(mapping) {
    return client.indices.putTemplate({
      name: mapping.template,
      body: mapping
    });
  }
}

