const { pool } = require('../index');

const reportAnswer = (answerId, callback) => {
  const params = [answerId];
  console.log(params);
  const reportAnswerQueryString = `
  UPDATE
    answers
  SET
    reported = 1
  WHERE
    answer_id = $1
  `;

  pool.query(reportAnswerQueryString, params, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  });
};
module.exports = reportAnswer;
