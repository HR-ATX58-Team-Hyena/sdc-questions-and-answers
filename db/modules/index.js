const getQuestions = require('./getQuestions');
const getAnswers = require('./getAnswers');
const addAnswer = require('./addAnswer');
const addQuestion = require('./addQuestion');
const markAnswerAsHelpful = require('./markAnswerAsHelpful');
const markQuestionAsHelpful = require('./markQuestionAsHelpful');
const reportAnswer = require('./reportAnswer');
const reportQuestion = require('./reportQuestion');

module.exports = {
  getQuestions,
  getAnswers,
  addAnswer,
  addQuestion,
  markAnswerAsHelpful,
  markQuestionAsHelpful,
  reportAnswer,
  reportQuestion,
};
