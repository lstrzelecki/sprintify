import * as express from 'express';

const app = express();

app.get('/api/', function (req, res) {
  res.send('Hello World')
})

const PORT = 4000;

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));