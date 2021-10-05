const { getQuestions } = require('../db/models');

test('Should retrieve a list of questions', (done) => {
  function callback(err, data) {
    try {
      // console.log(data);
      const questionData = data.results[0];
      expect(err).toBe(null);
      expect(questionData).toHaveProperty(
        'asker_name',
        'question_body',
        'question_date',
        'question_helpfulness',
        'question_id'
      );
      done();
    } catch (error) {
      done(error);
    }
  }
  getQuestions(1, null, null, callback);
});
