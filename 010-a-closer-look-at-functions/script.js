'use strict';

/* 10.137: MORE CLOSURE EXAMPLES */
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};
const h = function () {
    const b = 777;
    f = function () {
        console.log(b * 2);
    };
};
g();
f();

h();
f();

// Example 2
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
boardPassengers(100, 3);

/* 10.136: CLOSURES */
/*
A FUNCTION HAS ACCESS TO THE VARIABLE ENVIROMENT OF THE EXECUTION IN WHICH IT WAS CREATED
CLOSURE: VARIABLE ENVIROMENT TO THE FUNCTION, EXCTLY AS IT WAS AT THE TIME AND PLACE THE FUNCTION WAS CREATED
*/
const secureBooking = function () {
    // Remember scope rules, this cannot be accesses from the outside
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
booker();
booker();
booker();

console.dir(booker);

/* 10.135: IMMEDIATELLY INVOKED FUNCTION EXPRESSIONS (IIFE) */
/*
A function that is only executed once and never again. Function dissapear directly after its function call.

*/

const runOne = function () {
    console.log('This will nerver run again');
};
runOne();

// This is the function that is only used once
// IIFE
(function () {
    console.log('This will neve run again');
})();

// IIFE Arrow
(() => console.log('This will also never run again'))();
/* 10.132: THE CALL AND APPLY METHODS */
/* Allows us to explicitly define the this keyword in any function we want. */

const lufthansa = {
    airline: 'Lufthansa',
    iatacode: 'LH',
    bookings: [],
    // book function
    book(flightNum, name) {
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iatacode}${flightNum}`
        );
        this.bookings.push({ flight: `${this.iatacode}${flightNum}`, name });
    },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');
console.log(lufthansa);

const eurowings = {
    airline: 'Eurowings',
    iatacode: 'EW',
    bookings: [],
};

// Call function
const book = lufthansa.book;
// ERROR DOES NOT WORK - book(23, 'Sarah Williams');

book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swizz = {
    airline: 'Swizz Air Lines',
    iatacode: 'LX',
    bookings: [],
};

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swizz, flightData);
console.log(swizz);

// Above same as,
book.call(swizz, ...flightData);

/* 10.133: THE BIND METHOD */
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const boolLX = book.bind(swizz);

bookEW(23, 'Steven Williams');

const bookEW23 = book.bind(eurowings, 23); // Allows us to set in stone some arguments
bookEW23('Jonas Schmedtmann'); // Now you only need to provide one argument
bookEW23('Martha Cooper'); // Now you only need to provide one argument

const bookEW23Jonas = book.bind(eurowings, 23, 'Jonasss');
bookEW23Jonas();
bookEW23Jonas();
bookEW23Jonas();
bookEW23Jonas();
bookEW23Jonas();

// With addEventListeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this);
    this.planes++;
    console.log(this.planes);
};

document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa)); // If we dont use bind(lufthansa) the this will point to its parent i.e. the button class.

// Partial application

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVAT = addTax.bind(null, 0.23); // we dont care about the this pointer in this case. We set the VAT to 23%. We set the VAT to 23%

console.log(addVAT(100));
console.log(addVAT(23));

// Challenge

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};

const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

/* 10.131: FUNCTIONS RETURNING FUNCTIONS */
const greet = function (greeting) {
    return function (name) {
        console.log(`${greeting} ${name}`);
    };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge
const greetArr = (greeting) => (name) => console.log(`${greeting} ${name}`);

const greeterHey2 = greetArr('Whatsupp!!');
greeterHey2('Jonas2');
greeterHey2('Steven2');

greetArr('Hello3')('Jonas3');

/* 10.130: FUNCTIONS ACCEPTING CALLBACK FUNCTIONS */
const oneWord = function (str) {
    return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
    const [first, ...others] = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
};

// Higher order function
const transformer = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`); // A function is an object
};

transformer('Javascript is the best!', upperFirstWord);
transformer('Javascript is the best!', oneWord);

const high5 = function () {
    console.log('clap');
};

// Also an  higher order function
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

/* 10.129: FIRST-CLASS AND HIGHER ORDER FUNCTIONS */

/* 10.128: HOW PASSING ARGUMENTS WORK: VALUE VS REFERENCE */
const flight = 'LH234';
const jonas = {
    name: 'Jonas Schmedtmann',
    passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if (passenger.passport === 24739479284) {
        alert('checkin');
    } else {
        alert('Wrong passport');
    }
};

checkIn(flight, jonas);
console.log(flight); // Not affected by the change - primitive type - passed by value
console.log(jonas); // Affected of the change - non-primitive type - passed by reference

/* 10.129: FIRST CLASS AND HIGHER ORDER FUNCTIONS */

/* 10.127: DEFAULT PARAMETERS */

const bookings = [];

/* ES6: NEW WAY TO SET DEFAULTS */
const createBooking = function (flightNum, numPassengers = 1, price = 199) {
    /* ES5: OLD METHOD TO SET DEFAULTS */
    /*
  numPassengers = numPassengers || 1;
  price = price || 199;
  */

    const booking = {
        flightNum,
        numPassengers,
        price,
    };
    console.log(booking);
    bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// undefined will make js to insert the default value
createBooking('LH123', undefined, 1000);
