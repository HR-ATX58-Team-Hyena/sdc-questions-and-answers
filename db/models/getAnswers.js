const { pool } = require('../index');

const getAnswers = (questionId, page = 0, count = 5, callback) => {
  const offset = page * count;
  const photosParams = [];
  const answersList = [];
  const answersParams = [questionId, offset, count];
  const getAnswersQueryString = `
  SELECT
<<<<<<< HEAD
    answers.answer_id, body, date, answerer_name, helpfulness, photos.id, photos.url
  FROM
    questions
  INNER JOIN
    answers ON questions.question_id = answers.question_id
  LEFT OUTER JOIN photos ON answers.answer_id = photos.answer_id
=======
    answers.answer_id, body, date, answerer_name, helpfulness,
    ARRAY_AGG (
      json_build_object ('id', photos.id, 'url', photos.url)) photos
  FROM
    answers
  INNER JOIN photos ON answers.answer_id = photos.answer_id
>>>>>>> main
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
      // if (answersData.rows.length > 0) {
      //   answersData.rows.forEach((answer) => {
      //     answersList.push({ ...answer, photos: [] });
      //     photosParams.push(answer.answer_id);
      //   });
      //   const getAnswersPhotos = `
      //     SELECT
      //       answers.answer_id, photos.id, photos.url
      //     FROM
      //       answers
      //     INNER JOIN photos ON answers.answer_id = photos.answer_id
      //     WHERE
      //       answers.answer_id IN (${photosParams.join(', ')});
      //   `;
      //   pool.query(getAnswersPhotos, (err, photosData) => {
      //     if (err) {
      //       callback(err, null);
      //     } else {
      //       answersList.forEach((answer) => {
      //         photosData.rows.forEach((photo) => {
      //           if (answer.answer_id === photo.answer_id) {
      //             answer.photos.push({
      //               id: photo.id,
      //               url: photo.url,
      //             });
      //           }
      //         });
      //       });
      //     }
      //     const res = {
      //       question: questionId,
      //       page,
      //       count,
      //       results: answersList,
      //     };
      //     callback(null, res);
      //   });
      // }
      // let response = [];
      // answersData.rows.forEach((answerData) => {
      //   let answer = {};
      //   answer.answer_Id = answerData.answer_id;
      //   answer.body = answerData.body;
      //   answer.date = answerData.date;
      //   answer.answerer_name = answerData.answerId;
      //   answer.helpfulness = answerData.helpfulness;
      //   answer.photos = answerData.photos;
      // });
      // const res = {
      //   question: questionId,
      //   page,
      //   count,
      //   results: {
      //     and,
      //   },
      // };
      console.log(answersData);
      callback(null, answersData);
    }
  });
};

module.exports = getAnswers;
