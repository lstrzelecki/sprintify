import * as elasticsearch from 'elasticsearch';

declare var process: any;
const elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';

const client = new elasticsearch.Client({
  host: `${elasticsearchHost}:9200`
});

export default client;
