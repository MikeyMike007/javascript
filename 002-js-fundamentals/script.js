/* 2.2 VALUES AND VARIABLES */
let js = "amazing";
console.log(40 + 8 + 23 - 10);
let firstName = "Jonas";
console.log(firstName);
const PI = 3.1415;

/* MORE DESCRIPTIVE NAMING */

let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";

/* LESS DESCRIPTIVCE */

let job1 = "Programmer";
let job2 = "Teacher";

/* 2.12: DATA TYPES */

let javascriptIsFun = true;
console.log(typeof javascriptIsFun); // boolean
javascriptIsFun = "YES";
console.log(typeof javascriptIsFun); // string

let year;
console.log(typeof year); // undefined

/* 2.13: let, const and var */
let age = 30;
age = 31; // OK!

const birthYear = 1991;
// birthYear = 1990; // ERROR!

// Avoid the var declaration

/* 2.14: BASIC OEPRATORS */

// Concatenation
const firstName2 = "Firstname";
const lastName2 = "Surname";

// Method 1
console.log(firstName2 + " " + lastName2);

// Method 2
console.log(`${firstName2} ${lastName2}`);

let x = 10 + 5;
x++; // x = x + 1
x += 10;
let ageSarah = 30;

const isFullAge = ageSarah >= 18;

/* 2.20: TYPE CONVERSION AND COERCION */

// Type conversions
let inputYearStr = "1991";
let inputYearNum = Number(inputYearStr); // Conversion to number
inputYearNum++;
let inputYearStr2 = String(inputYearNum); // Conversion to string

// Type coercions
console.log("I am " + 23 + " years old");
console.log("23" - "10" - 3); // 10 (Number)
console.log("23" / "2"); // 11.5 (Number)
console.log("23" > "18"); // true

/* 2.21: TRUTHY AND FALSY VALUES */
console.log(Boolean(0)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean("Jonas")); // true
console.log(Boolean({})); // false
console.log(Boolean("")); // false

const money = 0;
if (money) console.log("Dont spend it all");
else console.log("You should get a job"); // Written to log

const moreMoney = 100;
if (moreMoney) console.log("Dont spend it all");
// Written to log
else console.log("You should get a job");

let height;
if (height) console.log("YAY! height is defined");
// Written to log
else console.log("Height is undefined");

height = 123;
if (height) console.log("YAY! height is defined");
// Written to log
else console.log("Height is undefined");

height = 0;
if (height) console.log("YAY! height is defined");
else console.log("Height is undefined"); // PLEASE NOTE: WRITTEN TO LOG

/* 2.22 EQUALITY OPERATORS == VS === */

const age3 = 18;

// === Compares both value and type (strict)
if (age3 === 18) console.log("You just became adult");
// Written to console
else {
}

// === Compares value (loose)
if (age3 == "18") console.log("You just became adult");
// Written to console
else {
}

const favoriteNumber = prompt("Whats your favorite number");

console.log(favoriteNumber);
console.log(favoriteNumber); // String;

// This can be solved with

const favoriteNumber2 = Number(prompt("Whats your favorite number?"));
console.log(favoriteNumber2);
console.log(typeof favoriteNumber2);

/* 2.23: BOOLEAN LOGIC */

console.log(true && true); // true
console.log(true && false); // false
console.log(true || false); // true
console.log(false || false); //false
console.log(true || true); // true
console.log(!true); // false
console.log(!false); // true

/* 2.26: THE SWITCH STATEMENT */

const myDay = "monday";

switch (myDay) {
  case "monday":
    console.log(`Today is ${myDay}`);
  case "tuesday":
    console.log(`Today is ${myDay}`);
  case "wendsday":
    console.log(`Today is ${myDay}`);
  case "thursday":
    console.log(`Today is ${myDay}`);
  case "friday":
    console.log(`Today is ${myDay}`);
  case "saturday":
    console.log(`Today is ${myDay}`);
  case "sunday":
    console.log(`Today is ${myDay}`);
  default:
    console.log("Error - Not a valid day");
}

switch (myDay) {
  case "monday":
  case "tuesday":
  case "wendsday":
  case "thursday":
  case "friday":
    console.log(`Work`);
  case "saturday":
  case "sunday":
    console.log(`Rest`);
  default:
    console.log("Error - Not a valid");
}

/* 2.28 THE TERNARY OPERATOR */

const age5 = 23;

age5 <= 18
  ? console.log("I like to drink wine")
  : console.log("I like to drink water");

const drink = age5 >= 18 ? "Wine" : "Water";

console.log(`I like to drink ${age5 >= 18 ? "Wine" : "Water"}`);

/* 2.30: JS RELASES ES5, ES6+ and ESNext */
