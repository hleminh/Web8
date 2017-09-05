const express = require('express');
const Router = express.Router();
const fs = require('./fileController');

Router.get('/:id', (req, res) => {
  var question = fs.getQuestionById(req.params.id);
  res.render('result', {
    question: question.question,
    yes: question.yes,
    no: question.no,
    layout: 'sub'
  });
});

module.exports = Router;
