import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

import backlog from './queries/backlog';

const app = express();

const schema = buildSchema( `
  type Query {
    hello: String,
    backlog: [Story]
  }

  type Story {
    num: Int,
    title: String,
    size: Int
  }
`);

var root = {
  hello: () => {
    return 'Hello world GraphQL!';
  },
  ...backlog
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.get('/api/', function (req, res) {
  res.send('Hello World REST!')
});

const PORT = 4000;

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));