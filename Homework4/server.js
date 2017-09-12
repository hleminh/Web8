const express = require("express");
const handlebars = require('express-handlebars');
const fs = require("./fileController");
const bodyParser = require('body-parser');
const apiRouter = require("./apiRouter");
const questionRouter = require("./questionRouter");
const filename = "test.txt";

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

app.get('/', (req, res) => {
  var randomQuestion = fs.readFromDatabase();
  res.render('answer', {
    question: randomQuestion,
    layout: 'answerLayout'
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
