const { pool } = require('../index');

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
    question_id, question_body, question_date, asker_name, question_helpfulness, reported
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

module.exports = getQuestions;
