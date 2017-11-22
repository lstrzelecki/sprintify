import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';

const app = express();

const schema = buildSchema( `
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => {
    return 'Hello world GraphQL!';
  },
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