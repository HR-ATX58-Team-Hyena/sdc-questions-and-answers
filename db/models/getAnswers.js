const { pool } = require('../index');

const getAnswers = (questionId, page = 0, count = 5, callback) => {
  const offset = page * count;
  const response = {};
  const answersParams = [questionId, offset, count];
  const getAnswersQueryString = `
  SELECT
    answers.answer_id, body, date, answerer_name, helpfulness,
    ARRAY_AGG (
      json_build_object ('id', photos.id, 'url', photos.url)) photos
  FROM
    answers
  INNER JOIN photos ON answers.answer_id = photos.answer_id
  WHERE
    answers.question_id = $1
  AND
    answers.reported = 0
  GROUP BY
    answers.answer_id
  ORDER BY
    answers.helpfulness DESC
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY
  `;

  pool.query(getAnswersQueryString, answersParams, (err, answersData) => {
    if (err) {
      callback(err, null);
    } else {
      response.question = questionId;
      response.page = page;
      response.count = count;
      response.results = answersData.rows;
      callback(null, response);
    }
  });
};

module.exports = getAnswers;
