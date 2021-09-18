# Notes JS fundamentals part 2

## Strict mode

Brings a more granular level of debugging

## Functions

See examples:

```javascript
// Type 1 function definition
function myFunction(myArgument) {
  console.log(`myArgument = ${myArgument}`);
  // Use return if you want to return something
}

// Type 2 function definition
const myFunction2 = function (myArgument) {
  console.log(`myArgument = ${myArgument}`);
  // Use return if you want to return something
};

// Type 3 function definition (arrow function)
const calcAge = (birthYear) => 2021 - birthYear; // Dont need () in this case // Dont need () in this case
const myAge = calcAge(1978); // 42

const yearsToRetirement = (birthYear) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  return retirement;
};

const yearsToRetirement2 = (birthYear, firstName) => {
  const age = 2021 - birthYear;
  const retirement = 65 - age;
  return `${firstName} retires at ${retirement}`;
};
```

## Introduction to arrays

```javascript
// Type 1 definition
const friends = ["Michael", "Steven", "Peter"];

// Type 2 definition
const years = new Array(1991, 1984, 2008, 2020);

const lengtOfYearsArray = years.length;
const lastElementOfYearsArray = years[years.length - 1];
friends[2] = "Jay";
friends[3] = "Thomas";
console.log(friends);
friends[6] = "Jason"; // Element 4, 5 is undefined.

// Its fine to mix types in an Array
const newArray = [
  "Jonas",
  30,
  ["Michael", "Steven", "Peter"],
  { name: "Jonas", age: "30", occupation: "Developer" },
];
console.log(newArray);
```

## Basic array operations (Methods)

Please see examples:

```javascript
/* BASIC ARRAY OPERATIONS */

const myFriends = ["Michael", "Steven", "Peter"];
myFriends.push("Jay"); // At at end
const newLength = myFriends.push("Thomas"); // returns new length of array
myFriends.unshift("John"); // Add at beginning
myFriends.pop(); // Delete from end
myFriends.shift(); // Delete from beginning
const indexOfSteven = myFriends.lastIndexOf("Steven");
const isStevenIncluded = myFriends.includes("Steven"); // true
```

## Introduction to objects

Arrays: Index -> value (pair)
Objects: Key -> value (pair)

Example:

```javascript
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "Teacher",
  friends: ["Michael", "Peter", "Steven"],
};
```

## 3.43: DOT VS BRACKET NOTATION

There is two methods to retrieve object data i.e. `obj.element` or `obj['element']`

Example:

```javascript
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "Teacher",
  friends: ["Michael", "Peter", "Steven"],
};

console.log(jonas.lastName); // Schmedtmann
console.log(jonas["lastName"]); // Schmedtmann

const interestedIn = promt(
  "What do you want to know about jonas? firstName, lastName, age or job?"
);
console.log(jonas[interestedIn]); // prints out variable value

// You can also add new elements
jonas.location = "Portugal";
jonas["twitter"] = "@jonasschmedtman";

// Other
console.log(
  `${jonas.firstName} has ${jonas.friends.length}, and his best friend is ${jonas.friends[0]}`
);
```

## Object methods

Examples:

```javascript
const jonas2 = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "Teacher",
  friends: ["Michael", "Peter", "Steven"],

  calcAge: (currentYear, birthYear) => {
    return currentYear - birthYear;
  },

  // You can also use the object variable 'birthYear' using this
  calcAge2: (currentYear) => {
    return currentYear - this.birthYear;
  },

  setNewVar: () => {
    this.newVar = "I am a new variable if you run this function";
    console.log(this.newVar);
  },
  getSummary: () => {
    console.log(`Firstname: ${this.firstName}`);
    console.log(`Lastname: ${this.lastName}`);
    console.log(`Age: ${this.calcAge2(2037)}`);
  },
};

// Two definitions on how to call the function
console.log(jonas2.calcAge(2021, 1991));
console.log(jonas2["calcAge"](2021, 1991));

console.log(jonas2.calcAge2(2021, 1991));
console.log(jonas2["calcAge2"](2021));

jonas2.setNewVar(); // I am a new variable if you run this function

jonas2.getSummary();
```

## The for loop

Example:

```javascript
for (let rep = 1; rep <= 10; rep++) console.log("Repetition x 10");
```

## Looping arrays

```javascript
const loopArray = [
  "Jonas",
  30,
  ["Michael", "Steven", "Peter"],
  { name: "Jonas", age: "30", occupation: "Developer" },
];

for (let i = 0; i < loopArray.length; i++) {
  console.log(`
  loopArray[${i}] =
  ${loopArray[i]}
  typeof loopArray[${i}] =
  ${typeof loopArray[i]}
    `);
}

// You can also use for of
for (el of loopArray) console.log(el); // Prints all elements
```

## Looping backwards

```javascript
for (let i = loopArray3.length - 1; i >= 0; i--) console.log(loopArray3[i]);
```

## While loop

```javascript
let rep = 0;

while (rep < 10) {
  console.log(`rep: ${rep}`);
  rep++;
}
```
