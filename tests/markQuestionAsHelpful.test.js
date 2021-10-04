const { markQuestionAsHelpful } = require('../db/models');

test('Should mark a question as helpful', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('UPDATE');
      done();
    } catch (error) {
      done(error);
    }
  }
  markQuestionAsHelpful(1, callback);
});
