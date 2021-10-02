const express = require('express');
const cors = require('cors');
const {
  getQuestions,
  getAnswers,
  addAnswer,
  addQuestion,
  markAnswerAsHelpful,
  markQuestionAsHelpful,
  reportAnswer,
  reportQuestion,
} = require('../db/modules');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// ROUTES

// get questions
// params: product_id, page, count
app.get('/qa/:product_id', (req, res) => {
  console.log(req.params.product_id);
  const productId = req.params.product_id;
  getQuestions(
    productId,
    // req.params.page,
    // req.params.count,
    (err, questionsList) => {
      if (err) {
        console.log('Failed to retrieve questions from db', err);
        res.status(404).send();
      } else {
        res.send({
          product_id: productId,
          results: questionsList.rows,
        });
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
// params: product_id
// body params: body, name, email
app.post('/qa/:product_id', (req, res) => {
  // console.log('productid', req.params.product_id);
  // console.log('body', req.body.body);
  const productId = req.params.product_id;
  const { body, name, email } = req.body;
  console.log(body);
  addQuestion(productId, body, name, email, (err, success) => {
    if (err) {
      console.log('Failed to add question', err);
      res.status(404).send();
    } else {
      console.log('Successfully added question', success);
      res.status(201).send();
    }
  });
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
