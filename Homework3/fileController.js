const fs = require("fs");
const database = "db.txt";
let currentId;


const saveFile = (filename, data) => {
  fs.writeFileSync(filename, data);
}

const readFile = (filename, callback) => {
  return fs.readFile(filename, "utf-8", (err, data) => {
    callback(data);
  });
}

const readFileSync = (filename) => {
  return fs.readFileSync(filename, "utf-8");
}

const insertToDatabase = (question) => {
  var db = fs.readFileSync(database);
  var containerObj = JSON.parse(db);
  var randomId = Math.floor(Math.random() * 100) + 1;
  while (containerObj.ids.includes(randomId)) {
    randomId = Math.floor(Math.random() * 100) + 1;
  }

  containerObj.questions.push({
    id: randomId = Math.floor(Math.random() * 100) + 1,
    question: question,
    yes: 0,
    no: 0
  });

  containerObj.ids.push(randomId);

  saveFile(database, JSON.stringify(containerObj));

  currentId = randomId;
}

const readFromDatabase = () => {
  var db = fs.readFileSync(database);
  var containerObj = JSON.parse(db);
  var question = containerObj.questions[Math.floor(Math.random() * containerObj.questions.length)];
  if (question != null) currentId = question.id;
  return question;
}

const getQuestionById = () => {
  var id = currentId;
  var db = fs.readFileSync(database);
  var containerObj = JSON.parse(db);
  for (el of containerObj.questions) {
    if (el.id == id) {
      return el;
    }
  }
}

const updateQuestionById = (answer) => {
  var id = currentId;
  var db = fs.readFileSync(database);
  var containerObj = JSON.parse(db);
  for (el of containerObj.questions) {
    if (el.id == id) {
      console.log(el);
      if (answer == "Yes") {
        el.yes = el.yes + 1;
      } else if (answer == "No") {
        el.no = el.no + 1;
      }
      saveFile(database, JSON.stringify(containerObj));
      return;
    }
  }
}

const getCurrentId = () => {
  return currentId;
}

module.exports = {
  saveFile,
  readFile,
  readFileSync,
  insertToDatabase,
  readFromDatabase,
  getQuestionById,
  updateQuestionById,
  getCurrentId
}
