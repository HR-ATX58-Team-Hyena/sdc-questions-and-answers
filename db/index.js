const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool(config);

const getQuestions = (product_id, page = 1, count = 4, callback) => {
  const pageParam = (() => {
    if (page === 1) {
      return 1;
    } else {
      return page * count;
    }
  })();

  const params = [product_id, pageParam, count];

  console.log(params);

  const getQuestionsQueryString = `
  SELECT
    question_id, question_body, question_date, asker_name, question_helpfulness
  FROM
    questions
  WHERE
    product_id = $1
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY;
  `;

  pool.query(getQuestionsQueryString, params, (err, questionsList) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, questionsList);
    }
  });
};

const addQuestion = () => {};

module.exports = {
  pool,
  getQuestions,
  addQuestion,
};
