const fs = require("fs");
const questionModel = require("./questionSchema")
let currentId;

const insertToDatabase = (question, callback) => {

  newQuestion = {
    question: question
  };

  questionModel.create(newQuestion, (err, question) => {
    if (err) {
      console.log(err);
    } else {
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
  insertToDatabase,
  readFromDatabase,
  getQuestionById,
  updateQuestionById,
  getCurrentId
}
