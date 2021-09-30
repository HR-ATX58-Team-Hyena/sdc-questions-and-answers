const express = require("express");
const app = express();
const port = 3000;
const { pool } = require("../db");

app.use(express.json());

// ROUTES

// get questions
// params: product_id, page, count
app.get("/qa/questions", (req, res) => {
  res.send("hello");
});

// get answers
// params:
// question_id = req.params.question_id
// query params:
// page = req.query.page
// count = req.query.count
app.get("/qa/questions/:question_id/answers", (req, res) => {
  console.log("params", req.params);
  console.log("query", req.query);
  res.send("get answer");
});

// add question
// body params: body text, name text, email text, product_id
app.post("/qa/questions", (req, res) => {
  res.status(201).send();
});

// add answer
// params: question_id
// body params: body text, name text, email text, photos [text]
app.post("/qa/questions/:question_id/answers", (req, res) => {
  res.status(201).send();
});

// mark question as helpful
// params: question_id
app.put("/qa/questions/:question_id/helpful", (req, res) => {
  res.status(204).send();
});

// report question
// params: question_id
app.put("/qa/questions/:question_id/report", (req, res) => {
  rest.status(204).send();
});

// mark answer helpful
// params: answer_id
app.put("/qa/answers/:answer_id/helpful", (req, res) => {
  res.status(204).send();
});

// report answer
// params: answer_id
app.put("/qa/answers/:answer_id/report", (req, res) => {
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
