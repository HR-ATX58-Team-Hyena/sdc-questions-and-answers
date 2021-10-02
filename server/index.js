const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const { pool, getQuestions, getAnswers } = require('../db');

app.use(cors());
app.use(express.json());

// ROUTES

// get questions
// params: product_id, page, count
app.get('/qa/:product_id', (req, res) => {
  console.log(req.params.product_id);

  getQuestions(
    req.params.product_id,
    // req.params.page,
    // req.params.count,
    (err, questionsList) => {
      if (err) {
        console.log('Failed to retrieve questions from db', err);
        res.status(404).send();
      } else {
        res.send({ results: questionsList.rows });
      }
    }
  );
});

// get answers
// params:
// question_id = req.params.question_id
// query params:
// page = req.query.page
// count = req.query.count
app.get('/qa/:question_id/answers', (req, res) => {
  getAnswers(
    req.params.question_id,
    req.query.page,
    req.query.count,
    (err, answersList) => {
      if (err) {
        console.log('Failed to retrieve answers from db', err);
        res.status(404).send();
      } else {
        res.send(answersList);
      }
    }
  );
});

// add question
// body params: body text, name text, email text, product_id
app.post('/qa/questions', (req, res) => {
  console.log(req.body);
  res.status(201).send('post question');
});

// add answer
// params: question_id
// body params: body text, name text, email text, photos [text]
app.post('/qa/questions/:question_id/answers', (req, res) => {
  res.status(201).send();
});

// mark question as helpful
// params: question_id
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  res.status(204).send();
});

// report question
// params: question_id
app.put('/qa/questions/:question_id/report', (req, res) => {
  res.status(204).send();
});

// mark answer helpful
// params: answer_id
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  res.status(204).send();
});

// report answer
// params: answer_id
app.put('/qa/answers/:answer_id/report', (req, res) => {
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
