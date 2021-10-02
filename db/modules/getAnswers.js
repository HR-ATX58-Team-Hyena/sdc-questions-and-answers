const { pool } = require('../index');

const getAnswers = (questionId, page = 0, count = 5, callback) => {
  const offset = page * count;
  const photosParams = [];
  const answersList = [];
  const answersParams = [questionId, offset, count];
  const getAnswersQueryString = `
  SELECT
    answer_id, body, date, answerer_name, helpfulness
  FROM
    questions
  INNER JOIN
    answers ON questions.question_id = answers.question_id
  WHERE
    questions.question_id = $1
  AND
    answers.reported = 0
  ORDER BY
    answers.helpfulness DESC
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY
  `;

  pool.query(getAnswersQueryString, answersParams, (err, answersData) => {
    if (err) {
      callback(err, null);
    } else {
      answersData.rows.forEach((answer) => {
        answersList.push({ ...answer, photos: [] });
        photosParams.push(answer.answer_id);
      });
      const getAnswersPhotos = `
        SELECT
          answers.answer_id, photos.id, photos.url
        FROM
          answers
        INNER JOIN photos ON answers.answer_id = photos.answer_id
        WHERE
          answers.answer_id IN (${photosParams.join(', ')});
      `;
      // photosParams,
      pool.query(getAnswersPhotos, (err, photosData) => {
        if (err) {
          callback(err, null);
        } else {
          answersList.forEach((answer) => {
            photosData.rows.forEach((photo) => {
              if (answer.answer_id === photo.answer_id) {
                answer.photos.push({
                  id: photo.id,
                  url: photo.url,
                });
              }
            });
          });
          const res = {
            question: questionId,
            page,
            count,
            results: answersList,
          };
          callback(null, res);
        }
      });
    }
  });
};

module.exports = getAnswers;
