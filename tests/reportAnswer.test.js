const { reportAnswer } = require('../db/models');

test('Should report a question', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('UPDATE');
      done();
    } catch (error) {
      done(error);
    }
  }
  reportAnswer(1, callback);
});
