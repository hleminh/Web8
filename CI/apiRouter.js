const express = require('express');
const Router = express.Router();
const fs = require('./fileController');

Router.post('/question', (req, res) => {
  fs.insertToDatabase(req.body.question);
  res.redirect('/question/' + fs.getCurrentId());
});

Router.post('/question/:id', (req, res) => {
  if (req.body.answer != null) {
    fs.updateQuestionById(req.body.answer);
  }
  res.redirect('/question/' + req.params.id);
})

module.exports = Router;
