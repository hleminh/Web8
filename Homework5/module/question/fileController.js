const fs = require("fs");
const questionModel = require("./questionSchema")
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

const insertToDatabase = (question, callback) => {

  newQuestion = {
    question: question
  };

  questionModel.create(newQuestion, (err, question) => {
    if (err) {
      console.log(err);
    } else {
      console.log(question);
      currentId = question._id;
      callback(question);
    }
  });

}

const readFromDatabase = (callback) => {
  questionModel.count({}, function(err, count) {
    console.log("Number of questions: ", count);
    random = Math.floor(Math.random() * count);
    questionModel.findOne().skip(random).exec(
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          if (result != null) {
            currentId = result._id;
            console.log(result);
          }
          callback(result);
        }
      }
    );
  });
}

const getQuestionById = (id, callback) => {
  questionModel.findOne({
    _id: id
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      callback(result);
    }
  });
}

const updateQuestionById = (answer, callback) => {
  questionModel.findOne({
    _id: currentId
  }, (err, result) => {
    if (answer == "yes") {
      result.yes = result.yes + 1;
    } else {
      result.no = result.no + 1;
    }
    result.save();
    callback();
  });
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
