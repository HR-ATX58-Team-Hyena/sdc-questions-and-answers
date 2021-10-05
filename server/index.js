const express = require('express');
const cors = require('cors');
const redis = require('redis');
const {
  getQuestions,
  getAnswers,
  addAnswer,
  addQuestion,
  markAnswerAsHelpful,
  markQuestionAsHelpful,
  reportAnswer,
  reportQuestion,
} = require('../db/models');

const client = redis.createClient();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

client.on('connect', () => {
  console.log('Connected to cache');
});

// ROUTES

// get questions
app.get('/qa/:product_id', (req, res) => {
  const productId = req.params.product_id;
  // if productId exists in Redis, return value
  // otherwise, send db query
  // store db query in Redis with productId as key
  questionsCache.exists(productId);
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
app.post('/qa/:product_id', (req, res) => {
  // needs to delete questions in redis for current productId
  const productId = req.params.product_id;
  const { body, name, email } = req.body;
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
app.post('/qa/:question_id/answers', (req, res) => {
  const productId = req.params.question_id;
  const { body, name, email, photos } = req.body;
  addAnswer(productId, body, name, email, photos, (err) => {
    if (err) {
      console.log('Failed to add answer/photos', err);
      res.status(404).send();
    } else {
      console.log('Successfully added answer/photos');
      res.status(201).send();
    }
  });
});

// mark question as helpful
app.put('/qa/question/:question_id/helpful', (req, res) => {
  const questionId = req.params.question_id;
  markQuestionAsHelpful(questionId, (err) => {
    if (err) {
      console.log('Failed to mark question as helpful', err);
      res.status(404).send('Failed to mark question as helpful');
    } else {
      console.log('Successfully marked question as helpful');
      res.status(204).send();
    }
  });
});

// mark answer helpful
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  const answerId = req.params.answer_id;
  markAnswerAsHelpful(answerId, (err) => {
    if (err) {
      console.log('Failed to mark answer as helpful', err);
      res.status(404).send('Failed to mark answer as helpful');
    } else {
      console.log('Successfully marked answer as helpful');
      res.status(204).send();
    }
  });
});

// report question
app.put('/qa/questions/:question_id/report', (req, res) => {
  const questionId = req.params.question_id;
  reportQuestion(questionId, (err) => {
    if (err) {
      console.log('Failed to report question', err);
      res.status(404).send('Failed to report question');
    } else {
      console.log('Successfully reported question');
      res.status(204).send();
    }
  });
});

// report answer
app.put('/qa/answers/:answer_id/report', (req, res) => {
  const answerId = req.params.answer_id;
  reportAnswer(answerId, (err) => {
    if (err) {
      console.log('Failed to report answer', err);
      res.status(404).send('Failed to report answer');
    } else {
      console.log('Successfully reported answer');
      res.status(204).send();
    }
  });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
