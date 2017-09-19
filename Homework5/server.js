const express = require("express");
const handlebars = require('express-handlebars');
const fs = require("./module/question/fileController");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRouter = require("./module/question/apiRouter");
const questionRouter = require("./module/question/questionRouter");
const config = require("./config.json");

let app = express();

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', apiRouter);

app.use('/question', questionRouter);

mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect success');
  }
});

app.get('/', (req, res) => {
  fs.readFromDatabase((randomQuestion) => {
    res.render('answer', {
      question: randomQuestion,
      layout: 'answerLayout'
    });
  });
});

app.get('/ask', (req, res) => {
  res.render('ask', {
    layout: 'askLayout'
  });
});

app.listen(6969, () => {
  console.log("Server is up");
});
