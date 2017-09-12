const fileController = require("./fileController");
const filename = "test.txt";

fileController.readFile(filename, (data) => {
  console.log(data);
});
