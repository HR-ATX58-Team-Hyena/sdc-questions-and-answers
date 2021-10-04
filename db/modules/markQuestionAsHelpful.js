const { pool } = require('../index');

const markQuestionAsHelpful = (questionId, callback) => {
  const params = [questionId];
  const markQuestionAsHelpfulQueryString = `
  UPDATE
    questions
  SET
    question_helpfulness = question_helpfulness + 1
  WHERE
    question_id = $1
  `;

  pool.query(markQuestionAsHelpfulQueryString, params, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  });
};
module.exports = markQuestionAsHelpful;
