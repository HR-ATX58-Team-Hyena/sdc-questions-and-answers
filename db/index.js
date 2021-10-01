const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

const getQuestions = (productId, callback) => {
  // page = 1, count = 4,
  // const pageParam = (() => {
  //   if (page === 1) {
  //     return 1;
  //   } else {
  //     return page * count;
  //   }
  // })();

  const params = [productId];
  // , pageParam, count
  // console.log(params);

  const getQuestionsQueryString = `
  SELECT
    question_id, question_body, question_date, asker_name, question_helpfulness
  FROM
    questions
  WHERE
    product_id = $1
  AND
    reported = 0
  `;
  // OFFSET $2 ROWS
  // FETCH FIRST $3 ROW ONLY;

  pool.query(getQuestionsQueryString, params, (err, questionsData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, questionsData);
    }
  });
};

const getAnswers = (productId, callback) => {
  const params = [productId];

  const getAnswersQueryString = `
  SELECT
    *
  FROM
    answers
  WHERE
    product_id = $1
  AND
    reported = 0
  `;

  pool.query(getAnswersQueryString, params, (err, answersData) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, answersData);
    }
  });
};

const addQuestion = () => {};

module.exports = {
  pool,
  getQuestions,
  getAnswers,
  addQuestion,
};
