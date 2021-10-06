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
client.on('connect', () => {
  console.log('Connected to cache');
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// get questions
app.get('/qa/:product_id', (req, res) => {
  try {
    client.get(JSON.stringify(req.params), (err, questionsData) => {
      if (err) {
        console.error(err);
      }
      if (questionsData) {
        res.send(JSON.parse(questionsData));
      } else {
        getQuestions(
          req.params.product_id,
          req.params.page,
          req.params.count,
          (err, questionsList) => {
            if (err) {
              console.log('Failed to retrieve questions from db', err);
              res.status(404).send();
            } else {
              client.setex(
                JSON.stringify(req.params),
                172800,
                JSON.stringify(questionsList)
              );
              res.send(questionsList);
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// get answers
app.get('/qa/:question_id/answers', (req, res) => {
  try {
    client.get(JSON.stringify(req.params), (err, answersData) => {
      if (err) {
        console.error(err);
      }
      if (answersData) {
        res.send(JSON.parse(answersData));
      } else {
        getAnswers(
          req.params.question_id,
          req.query.page,
          req.query.count,
          (err, answersList) => {
            if (err) {
              console.log('Failed to retrieve answers from db', err);
              res.status(404).send();
            } else {
              client.setex(
                JSON.stringify(req.params),
                172800,
                JSON.stringify(answersList)
              );
              res.send(answersList);
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// add question
app.post('/qa/:product_id', (req, res) => {
  // needs to delete questions in redis for current productId
  const productId = req.params.product_id;
  const { body, name, email } = req.body;
  addQuestion(productId, body, name, email, (err) => {
    if (err) {
      console.log('Failed to add question', err);
      res.status(404).send();
    } else {
      client.del(JSON.stringify(req.params));
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
      client.del(JSON.stringify(req.params));
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
      client.del(JSON.stringify(req.params));
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
      client.del(JSON.stringify(req.params));
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
      client.del(JSON.stringify(req.params));
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
      client.del(JSON.stringify(req.params));
      res.status(204).send();
    }
  });
});

module.exports = app;
