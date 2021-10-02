const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool(config);

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
    question_id, question_body, question_date, asker_name, question_helpfulness
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

const getAnswers = (productId, page = 0, count = 5, callback) => {
  const offset = page * count;
  const photosParams = [];
  const answersList = [];
  const answersParams = [productId, offset, count];
  console.log(answersParams);
  const getAnswersQueryString = `
  SELECT
    answer_id, body, date, answerer_name, helpfulness
  FROM
    questions
  INNER JOIN answers ON questions.question_id = answers.question_id
  WHERE
    product_id = $1
  AND
    answers.reported = 0
  OFFSET $2 ROWS
  FETCH FIRST $3 ROW ONLY;
  `;

  pool.query(getAnswersQueryString, answersParams, (err, answersData) => {
    if (err) {
      callback(err, null);
    } else {
      answersData.rows.forEach((answer) => {
        answersList.push({ ...answer, photos: [] });
        photosParams.push(answer.answer_id);
        console.log(photosParams);
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
          callback(null, answersList);
        }
      });
    }
  });
};

const addQuestion = () => {};

module.exports = {
  pool,
  getQuestions,
  getAnswers,
  addQuestion,
};
