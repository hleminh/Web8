const express = require('express');
const Router = express.Router();
const questionController = require('./questionController');

Router.get('/:id', (req, res) => {
  var question = questionController.getQuestionById(req.params.id, (question) => {
    res.render('result', {
      question: question.question,
      yes: question.yes,
      no: question.no,
      layout: 'answerLayout'
    });
  });
});

module.exports = Router;
