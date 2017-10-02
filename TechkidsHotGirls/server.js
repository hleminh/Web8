const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config.json');
const imageApiRouter = require('./modules/image/imageRouter.js');
const handlebars = require('express-handlebars');

let app = express();

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json({
  extended: true
}));

app.use('/api/image', imageApiRouter);


mongoose.connect(config.connectionString, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('connect success');
  }
});

app.listen(config.port, () => {
  console.log("Server is up");
});
