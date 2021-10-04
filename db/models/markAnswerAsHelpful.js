const { pool } = require('../index');

const markAnswerAsHelpful = (answerId, callback) => {
  const params = [answerId];
  const markAnswerAsHelpfulQueryString = `
  UPDATE
    answers
  SET
    helpfulness = helpfulness + 1
  WHERE
    answer_id = $1
  `;

  pool.query(markAnswerAsHelpfulQueryString, params, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  });
};

module.exports = markAnswerAsHelpful;
