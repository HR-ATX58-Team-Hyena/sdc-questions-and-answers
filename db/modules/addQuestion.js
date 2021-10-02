const { pool } = require('../index');

const addQuestion = (productId, body, name, email, callback) => {
  const params = [productId, body, name, email];
  const addQuestionQueryString = `
  INSERT INTO
    questions(product_id, question_body, asker_name, asker_email)
  VALUES
    ($1, $2, $3, $4);
  `;

  pool.query(addQuestionQueryString, params, (err, success) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, success);
    }
  });
};

module.exports = addQuestion;
