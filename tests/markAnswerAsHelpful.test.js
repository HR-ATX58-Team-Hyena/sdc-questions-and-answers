const { markAnswerAsHelpful } = require('../db/models');

test('Should mark an answer as helpful', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('UPDATE');
      done();
    } catch (error) {
      done(error);
    }
  }
  markAnswerAsHelpful(1, callback);
});
