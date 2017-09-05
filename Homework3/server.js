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
  res.render('home', {
    question: randomQuestion,
    layout: 'sub'
  });
});

app.get('/about', (req, res) => {
  res.render('about');
})

app.get('/read', (req, res) => {
  res.render('read', {
    header: filename,
    content: fs.readFileSync(filename)
  })
})

app.get('/ask', (req, res) => {
  res.render('askQuestion', {
    layout: 'sub'
  });
});

app.listen(6969, () => {
  console.log("Server is up");
});
