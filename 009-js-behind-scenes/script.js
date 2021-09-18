/* 8.96: The this keyword */
/* 8.97: The this keyword in practise */

// *this* in a global scope refers to the Window object
console.log(this);

// All functions defined in this way has its own *this* pointer. Thats because in javascript,
// all functions are objects
const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // The *this* pointer is undefined for this function (still it has its own *this - its just undefined)
};

const calcAgeArrow = (birthYear) => {
  console.log(2037 - birthYear);
  console.log(this); // Arrow functions dont have its own *this* pointers - they inherit *this* from its parent (Window class in this case)
};

calcAge(1991);
calcAgeArrow(1991);

/* RETRIEVING OBJECT VARIABLES FROM OBJECT METHODS USING *this* */
const jonas = {
  firstName: "Jonas",
  year: 1991,
  calcAge: function () {
    console.log(this); // jonas
    console.log(2037 - this.year); // OK => 2037 - 1991

    /* PROBLEM: HOW TO RETRIEVE THE *this* POINTER THAT REFERS TO THE jonas OBJECT */
    /* FROM FUNCTION WITHIN A FUNCTION?                                            */

    /* SOLUTION 1 */
    /*------------------------------------------------------------------------------------------*/
    // const self = this; // A trick so we can get the *this* pointer into the isMillenial function
    // const isMillenial = function () {
    //   console.log(this); // Will not work, this here refers to the window object
    //   console.log(self); // self refers to the object instance - i.e. jonas
    //   console.log(self.year); // 1991
    //   if (self.year >= 1981 && self.year <= 1996)
    //     console.log("I am a millenial");
    //   else console.log("I am not a millenial");
    // };

    /* SOLUTION 2 */
    /*------------------------------------------------------------------------------------------*/
    const isMillenial = () => {
      // The arrow function inherits the *this* pointer from its parent.
      // In this case the parent is the function calcAge. calcAge has
      // the *this* pointer to the object instance - So this works!!
      console.log(this.year);
      if (this.year >= 1981 && this.year <= 1996)
        console.log("I am a millenial");
      else console.log("I am not a millenial");
    };
    isMillenial();
  },
  greet: () => {
    `Hey ${this.firstName}`; // Does not work since it is a arrow function
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // Method borrowing
matilda.calcAge(); // *this* for matilda is now pointing to matilda

/* ARGUMENTS KEYWORD */
const addExpr = function (a, b) {
  console.log(arguments); // Special keyword
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 12, 30); // Works also but they dont have their own name - Although they exists.

const addExpr1 = (a, b) => {
  console.log(arguments); // Error! arrow functions dont have the property *arguments*
  return a + b;
};

//addExpr1(10, 12); //ERROR arrow functions dont have the property *arguments*

/* PRIMITIVES VS OBJECTS */

/*
Copy objects with `const copyObj = Object.assign({}, originalObh);`.
Please note that this is a shallow copy. So if you have defined an object
inside an object. The copy of the inside object will not follow.
*/

const jessica = {
  firstName: "Jessica",
  lastName: "Williams",
  age: 27,
  family: ["Alice", "Bob"],
};

const jessicaCopy = Object.assign({}, jessica);
jessicaCopy.lastName = "Davis";

jessica.family.push("Mary");
jessicaCopy.family.push("John");

/* THE FUNCTION Object.assign({}, jessica) ONLY COPYS THE FIRST LAYER - NOT OTHER OBJECTS */
console.log("Before marriage ", jessica.lastName); // Williams
console.log("Before marriage ", jessica.family); // ['Alice', 'Bob', 'Mary' 'John']

/* THE FUNCTION Object.assign({}, jessica) ONLY COPYS THE FIRST LAYER - NOT OTHER OBJECTS */
console.log("After marriage ", jessicaCopy.lastName); // Davis
console.log("After marriage ", jessicaCopy.family); // ['Alice', 'Bob', 'Mary' 'John']
