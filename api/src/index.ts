import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import dashboard from './queries/dashboard';
const schema = require('./schemas/schema.graphql');

const app = express();

var root = {
  ...dashboard
};

app.use('/api/graphql', graphqlHTTP({
  schema: buildSchema(schema),
  rootValue: root,
  graphiql: true,
}));

const PORT = 4000;

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));