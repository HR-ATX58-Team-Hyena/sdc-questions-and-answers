const { addAnswer } = require('../db/models');

test('Should add an answer', (done) => {
  function callback(err, data) {
    try {
      expect(err).toBe(null);
      expect(data.command).toBe('INSERT');
      done();
    } catch (error) {
      done(error);
    }
  }
  addAnswer(
    1,
    'this is a test',
    'testName',
    'test@email.com',
    ['photo1', 'photo2'],
    callback
  );
});
