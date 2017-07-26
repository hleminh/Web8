// function aRose() {
//   console.log("Sweet!");
// }
// var anotherName = aRose;
// typeof(anotherName)
// anotherName();
//
// function multiplyBy3(num){
//   return num*3;
// }
//
// function multiplyBy6(num){
//   return num*6;
// }
//
// function transformNumberWith(num, transformer){
//   return transformer(num);
// }
//
// console.log(transformNumberWith(3, multiplyBy3));
// console.log(transformNumberWith(3, multiplyBy6));

function countDown(time) {
  var count = time;
  for (var i = time; i >= 0; i--) {
    setTimeout(function() {
      console.log(count--);
    }, (time - i) * 1000);
  }
}

countDown(5);

function countDownRec(time) {
  setTimeout(function() {
    console.log(time);
    if (time > 0) countDownRec(time - 1);
  }, 1000);
}

countDownRec(5);

function createWebsiteCounter() {
  var numberOfVisitor = 0;

  function getNumberOfVisitor() {
    return numberOfVisitor;
  }

  function setNumberOfVisitor(num) {
    numberOfVisitor = num;
  }

  return {
    getNumberOfVisitor: getNumberOfVisitor,
    setNumberOfVisitor: setNumberOfVisitor
  }
}

var myWebsite = createWebsiteCounter();
