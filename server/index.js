// const newRelic = require('newrelic');
const app = require('./controllers');

const port = 3030;

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
