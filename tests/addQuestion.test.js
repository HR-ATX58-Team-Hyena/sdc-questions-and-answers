const { addQuestion } = require('../db/models');

test('Should add a question', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('INSERT');
      done();
    } catch (error) {
      done(error);
    }
  }
  addQuestion(1, 'This is a test', 'testName', 'test@email.com', callback);
});
