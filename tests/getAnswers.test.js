const { getAnswers } = require('../db/models');

test('Should retrieve a list of answers', (done) => {
  function callback(err, data) {
    try {
      const answerData = data.results[0];
      expect(err).toBe(null);
      expect(answerData).toHaveProperty(
        'answer_id',
        'answerer_name',
        'body',
        'date',
        'helpfulness',
        'photos'
      );
      done();
    } catch (error) {
      done(error);
    }
  }
  getAnswers(1, null, null, callback);
});
