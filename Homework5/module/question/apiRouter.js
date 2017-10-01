const express = require('express');
const Router = express.Router();
const questionController = require('./questionController');

Router.post('/question', (req, res) => {
  questionController.insertToDatabase(req.body.question, (question) => {
    res.redirect('/question/' + question.id);
  });
});

Router.post('/question/:id', (req, res) => {
  if (req.body.answer != null) {
    questionController.updateQuestionById(req.body.answer, () => {
      res.redirect('/question/' + req.params.id);
    });
  };
})

module.exports = Router;
