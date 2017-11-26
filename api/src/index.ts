import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema, execute, subscribe } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer, SubscriptionClient } from 'subscriptions-transport-ws';

import dashboard from './queries/dashboard';
import subscriptions from './subscriptions/dashboard';
import createOrUpdateStory from './commands/createOrUpdateStory';
import { PubSub } from 'graphql-subscriptions';

const app = express();
const queue = new PubSub();

var root = {
  ...subscriptions
};

const schema = makeExecutableSchema({
  typeDefs: require('./schemas/schema.graphql'),

  resolvers: {
    Query: {
      dashboard: () => true
    },
    Mutation: {
      ...createOrUpdateStory
    },
    Dashboard: dashboard,
    DashboardUpdatedEvent: {
      __resolveType: (val) => val.event
    }
  }
});

app.use('/api/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  context: { queue }
}));

const PORT = 4000;
const WS_PORT = 4001;

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

SubscriptionServer.create(
  { schema, execute, subscribe, rootValue: root, onConnect: () => ({ queue }) },
  { host: 'localhost', port: 4001, path: '/subscriptions' }
);
