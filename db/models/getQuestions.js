const { pool } = require('../index');

const getQuestions = (productId, callback) => {
  // page = 1, count = 4,
  // const offset = page * count;

  const params = [productId];
  // , pageParam, count
  const questionsList = {};
  const getQuestionsQueryString = `
  SELECT
    question_id, question_body, question_date, asker_name, question_helpfulness, reported
  FROM
    questions
  WHERE
    product_id = $1
  AND
    reported = 0
  ORDER BY
    question_helpfulness DESC
  `;
  // OFFSET $2 ROWS
  // FETCH FIRST $3 ROW ONLY;

  pool.query(getQuestionsQueryString, params, (err, questionsData) => {
    if (err) {
      callback(err, null);
    } else {
      questionsList.product_id = productId;
      questionsList.results = questionsData.rows;
      callback(null, questionsList);
    }
  });
};

module.exports = getQuestions;
