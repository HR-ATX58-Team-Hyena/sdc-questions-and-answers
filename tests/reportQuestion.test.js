const { reportQuestion } = require('../db/modules');

test('should report a question', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('UPDATE');
      done();
    } catch (error) {
      done(error);
    }
  }
  reportQuestion(1, callback);
});
