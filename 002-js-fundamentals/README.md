# Javascript fundamentals

## Hello World

With `alert()`, you can create a alert prompt.

## Linking in javascript into html

You can use inline javascript using the tag `<script>` in the javascript `<header>` block.

To create an individual javascript file, please specify the link in the `<script>` tag like `<script src="script.js"></script>></script>`

## Values and variables

In javascript, you use `camelCase` notation.

Use `console.log()` to write to the console or terminal.

You can declare variables with `let` or `const`.

Use descriptive variable declarations, see example below,

```javascript
/* MORE DESCRIPTIVE NAMING */

let myFirstJob = "Programmer";
let myCurrentJob = "Teacher";

/* LESS DESCRIPTIVCE */

let job1 = "Programmer";
let job2 = "Teacher";
```

## Data types

In javascripts, there are only two datatypes, primitives or objects.

7 primitive data types:

- `number`
- `string`
- `boolean`
- `undefined`
- `null`
- `symbol`
- `BigInt`

Javascriptn adopts "dynamic typing" which means that javascript assigns the variable type.

Comment code with `// this is a comment` or `/* this is a comment */`.

The `typeof` operator returns the type of the variable i.e.

```javascript
let javascriptIsFun = true;
console.log(typeof javascriptIsFun); // boolean
javascriptIsFun = "YES";
console.log(typeof javascriptIsFun); // string
```

## `let` and `const`

Avoid declaring variable with `var`.

Use `const` to declare constant variables.

Use `let` to declare non-constant variables;

Examples:

```javascript
let age = 30;
age = 31; // OK!

const birthYear = 1991;
birthYear = 1990; // ERROR!
```

## Basic operators

Concatenation:

Examples:

```javascript
// Concatenation
const firstName = "Firstname";
const surName = "Surname";

// Method 1
console.log(firstName + " " + lastName);

// Method 2
console.log(`${firstName} ${lastName}`);

let x = 10 + 5;
x++; // x = x + 1
x += 10;
let ageSarah = 30;

const isFullAge = ageSarah >= 18;
```

## Template literals

Use `${variableName}` inside of brackets js special brackets

## if, else if, else

Example:

```javascript
if(logicalStatement1) {
  ...
} else if (logicalStatement2) {
  ...
} else {
  ...
}
```

## Type conversion and coercion

Please see examples:

```javascript
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
```

## Truthy and falsy values

Please see examples:

```javascript
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
```

## Equality operators

The comparison operator `==` is said to be _loose_ since it only compares the value i.e. `console.log(18 == '18') // true`.

The comparison operator `===` is said to be _strict_ since it compares both the value and type i.e. `console.log(18 === '18') // false`.

See examples:

```javascript
const age = 18;

// === Compares both value and type (strict)
if (age === 18) console.log("You just became adult");
// Written to console
else {
}

// === Compares value (loose)
if (age == "18") console.log("You just became adult");
// Written to console
else {
}

const favoriteNumber = prompt("Whats your favorite number");

console.log(favoriteNumber);
console.log(favoriteNumber); // String;

// This can be solved with

const favoriteNumber2 = Number(prompt("Whats your favorite number?"));
console.log(favoriteNumber2);
console.log(typeof favoriteNumber2); // Number
```

## Boolean logic

`&&` - Means AND
`||` - Means OR
`!` - Means NOT

```javascript
console.log(true && true); // true
console.log(true && false); // false
console.log(true || false); // true
console.log(false || false); //false
console.log(true || true); // true
console.log(!true); // false
console.log(!false); // true
```

## Switch statement

Example 1:

```javascript
const myDay = "monday";

switch (myDay) {
  case "monday":
    console.log(`Today is ${myDay}`); // Written to log
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
```

Example 2:

```javascript
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
```

## The ternary operator

See example:

```javascript
const age = 23;

age >= 18
  ? console.log("I like to drink wine") // Written to console
  : console.log("I like to drink water");

const drink = age5 >= 18 ? "Wine" : "Water"; // Wine

console.log(`I like to drink ${age5 >= 18 ? "Wine" : "Water"}`); // I like to drink Wine
```
