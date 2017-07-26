
/*
 * This is a multi-line comment
 */

// This is a single line comment

/*
 * VARIABLES
 */
var variableName;  // declaring a variable
/*
 * All variables in javascript are declared using the keyword 'var'.
 * Variables names start with letters (a-z,A-Z), underscore (_) or dollar sign ($),
 * subsequence characters can be any unicode character.
 */

variableName = 6;  // assigning the value '6' to the variable
var anotherVariable = 20 + variableName; // declaring a new variable and assign new value to it

variableName = "A string"; // assigning a string to our variable.
/*
 * Javascript doesn't force variable to hold only 1 type of value.
 * Variables can hold any type of value you want - numbers, string, objects. They're all variables!
 * This behavior is called 'loosely typed variable'. Javascript is a 'loosely typed' language
 */


/*
 * FUNCTIONS
 */

// Declaring a function
function sayCoolThings(){
  console.log('Cool Things');
}

// Another way to declare a function
var sayHello = function(name){
  console.log('Hello!' + name);
}

sayCoolThings();  // calling function `sayCoolThings`
sayHello('Annie'); // calling function 'sayHello' with parameter 'Annie'


var obj = {}; // declaring an empty object with shorthand syntax '{}'

// add a new function 'count' to the object.
// a function that belong to an object is called an object's method.
obj.count = function(number){
  if(number <= 5){
    console.log(number);
  }
  else{
    console.log('This number is too big for me');
  }
}

obj.count(6);  // calling function 'count' of obj
