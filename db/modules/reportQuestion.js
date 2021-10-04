const { pool } = require('../index');

const reportQuestion = (questionId, callback) => {
  const params = [questionId];
  const reportQuestionQueryString = `
  UPDATE
    questions
  SET
    reported = 1
  WHERE
    question_id = $1
  `;

  pool.query(reportQuestionQueryString, params, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
      console.log(success);
    }
  });
};

module.exports = reportQuestion;
