const { pool } = require('../index');

const addAnswer = (questionId, body, name, email, photos, callback) => {
  const params = [questionId, body, name, email];
  const addAnswerQueryString = `
  INSERT INTO
    answers(question_id, body, answerer_name, answerer_email)
  VALUES
    ($1, $2, $3, $4)
  RETURNING answer_id;
  `;
  // get answerId back, send query to that answerId
  pool.query(addAnswerQueryString, params, (err, answerSuccess) => {
    if (err) {
      callback(err, null);
    } else {
      const answerId = answerSuccess.rows[0].answer_id;
      if (photos.length > 0) {
        photos.forEach((photo) => {
          const photosParams = [answerId, photo];
          const addAnswerPhotos = `
          INSERT INTO
            photos(answer_id, url)
          VALUES
            ($1, $2);
          `;
          pool.query(addAnswerPhotos, photosParams, (err, photoSuccess) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, photoSuccess);
            }
          });
        });
      }
      callback(null, answerSuccess);
    }
  });
};
module.exports = addAnswer;
