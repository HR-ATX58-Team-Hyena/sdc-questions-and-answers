const { getQuestions } = require('../db/modules');

test('Should retrieve list of questions', (done) => {
  function callback(err, data) {
    try {
      const questionData = data.rows[0];
      expect(err).toBe(null);
      console.log(data.rows[0]);
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
  getQuestions(1, callback);
});
