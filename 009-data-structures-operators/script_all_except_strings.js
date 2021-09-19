'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/* 9.120: WORKING WITH STRINGS - PART1
 * ---------------------------------------------------------------------
 *
 */

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

// YOU CAN ALSO SPECIFY THE OBJECT LIKE THIS
const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHoursNew = {
    [weekdays[3]]: {
        open: 12,
        close: 22,
    },
    [weekdays[4]]: {
        open: 11,
        close: 23,
    },
    [`weekdays[${5}]`]: {
        open: 0, // Open 24 hours
        close: 24,
    },
};
console.log(openingHoursNew);

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    // OLD WAY OF WRITING FUNCTIONS INSIDE OBJECTS (METHODS)
    /*
    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]]
    }
    */

    // NEW WAY IN ES6
    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },

    // Using default values 1, 0, '20:00'
    orderDelivery: function ({
        starterIndex = 1,
        mainIndex = 0,
        time = '20:00',
        address,
    }) {
        console.log(
            `Order recieved! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at time ${time}`
        );
    },

    orderPasta: function (ing1, ing2, ing3) {
        console.log(
            `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
        );
    },
    orderPizza: function (mainIngridient, ...otherIngredients) {
        console.log(mainIngridient);
        console.log(otherIngredients);
    },
    // Before
    // openingHours: openingHours,

    // Now with ES6 enhanced object literals - just write the name of the object
    openingHours,
};

/* 9.103: Destructuring arrays */

// Old way
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c); // 2, 3, 4

// New way
const [a1, b1, c1] = arr;
console.log(a1, b1, c1); // 2, 3, 4

// You dont need to unpack all elements of array
const [firstEl, secondEl] = restaurant.categories;
const [firstEl1, , thirdEl1] = restaurant.categories;

/* WHAT IF THE RESTURANTS SWITCHES PLACES? */
let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Old way of switching
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

//New way of switching
let [main1, , secondary1] = restaurant.categories;
console.log(main1, secondary1);
[main1, secondary1] = [secondary1, main1];
console.log(main1, secondary1);

// Recieve 2 returns values from a function
console.log(restaurant.order(2, 0));
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Destructuring a nested array
const nested = [2, 4, [5, 6]];
// Destructuring directly inside main array
const [i, , [j, k]] = nested;
console.log(i, j, k); // 2 5 6

// Default values
const [p, q, r = 1] = [8, 9];
console.log(p, q, r); // 8 9 1

/* 9.104: Destructuring objects */

// Destructure objects => Use curly braces

// Need to provide the exact name of the properties

const { name, openingHoursX, categories } = restaurant;
console.log(name, openingHoursX, categories);

// You can rename the variable names using this method below:
const {
    name: resturantName,
    openingHours: hours,
    categories: tags,
} = restaurant;

// Default values
// --------------------------------------------------------------------------------------------
// Default values for those datapoints that doesnt exist in the object resturant.
// E.g. menu doesnt exist in resturant. Thats why the variable menu gets the standard value []
// E.g. starterMenu exists so the variable starters get its values.
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables
// --------------------------------------------------------------------------------------------
let a2 = 111;
let b2 = 999;
const obj = { a2: 23, b2: 7, c2: 14 };

// let { a2, b2 } = obj; // ERROR. NEED TO USE TRICK
({ a2, b2 } = obj); //a2 = 111 => a2 = 23 b2 = 999 => b2 = 7
console.log(a2, b2); // 23 7

// Destructuring nested objects
// --------------------------------------------------------------------------------------------
const {
    fri: { open, close },
} = openingHours;
console.log(open, close); // 11 23

// Or if you want to change variable names
const {
    fri: { open: o2, close: c2 },
} = openingHours;
console.log(o2, c2); // 11 23

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    starterIndex: 2,
});

// Using defaults as all parameters were not provided
// Output: Order recieved! Bruschetta and Pizza will be delivered to Via del Sole, 21 at time 20:00
restaurant.orderDelivery({
    address: 'Via del Sole, 21',
    starterIndex: 1,
});

/* 9.105: THE SPREAD OPERATOR
 * ---------------------------------------------------------------------
 * Use the spread operator to expand an array to all its elements i.e.
 * unpacking all its elements into single variables.
 *
 * Please note that the spread operator works on all iterables
 * It also works on objects
 */

// Copy arrays
// ---------------------------------------------------------------------

const arr1 = [7, 8, 9];

// OLD WAY
const badNewArr = [1, 2, arr1[0], arr1[1], arr1[2]];
console.log(badNewArr);

// MODERN WAY WITH SPREAD-OPERATOR

const newArr = [1, 2, ...arr1]; // ... is taking out all the elements from the array and putting them here manually
console.log(newArr);

console.log(...newArr); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci']; // ADD ITEMS TO THE NEW MENU WITH SPREAD OPERATOR
console.log(...newMenu);

const mainMenuCopy = [...restaurant.mainMenu]; // Shallow copy
console.log(mainMenuCopy);

const menu1 = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu1);

// Iterables: arrays, strings, maps, sets, NOT obhects
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
// console.log(`${...str} Schmedtmann`) // Not allowed

const ingredients = [
    // prompt("Let's make pasta! Ingedient 1?"),
    // prompt('Ingedient 2?'),
    // prompt('Ingredient 3?'),
];

console.log(ingredients);
restaurant.orderPasta(...ingredients);

// Spread operator works also on objects

const newResturant = {
    foundedIn: 1998,
    ...restaurant,
    founder: 'Guiseppe',
};
console.log(newResturant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy);
console.log(restaurant);

/* 9.106: REST PATTERNS AND PARAMETERS
 * ---------------------------------------------------------------------
 * Pack elements into an array (opposite to the rest operator ...).
 * Same syntax as the rest operator.
 */

// SPREAD, because the ... is on the RIGHT side of the equal sign (=)
const arr2 = [1, 2, ...[3, 4]];
console.log(arr2); // [1, 2, 3, 4]

// REST, because on the left side of the equal sign (=)
const [aa, bb, ...others] = [1, 2, 3, 4, 5];
console.log(aa, bb, others); // 1 2 [3, 4, 5]

const [pizza, , risotto, ...otherFood] = [
    ...restaurant.mainMenu,
    ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); // Pizza Risotto ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad']

const { sat, ...weekdaysX } = restaurant.openingHours;
console.log(sat); // {open: 0, close: 24}
console.log(weekdaysX); // {thu: {open: 11, close: 23}, fri: {open: 12, close: 23}}

// 2) Functions - Numbers pack the parameters into an array

const add = function (...numbers) {
    for (let number of numbers) console.log(number);
};

add(2, 3);
add(5, 3, 7, 2);
add(1, 2, 3, 4, 5, 6, 7, 8, 9);

const x = [23, 5, 7];

// Trick =) First, upack values of array with Rest operator into function arguments. Then pack the values inside the function to an array
add(...x);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
//Output:
// mushroom
// [onion, olives, spinach]

restaurant.orderPizza('mushrooms');
// mushrooms
// []

/* 9.107: SHORT CIRCUITING (&& and ||)
 * ---------------------------------------------------------------------
 *
 */

// OR (||)
// Use any datatype, return any data type, short-circuiting
console.log(3 || 'jonas'); // 3 (returns first element if its a "true value")
console.log('' || 'Jonas'); // 'Jonas'
console.log(true || 0); // true
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // 'Hello'

/*
restaurant.numGuests = null

const guests1 = restaurant.numGuests ? restaurant.numGuests : 10
console.log(guests1) // 10
const guests2 = restaurant.numGuests || 10
console.log(guests2) // 10

// AND (&&)
console.log(0 && 'Jonas') // 0
console.log(7 && 'Jonas') // Jonas
console.log('Hello' && 23 && null && 'jonas') // null

// practical example
if (restaurant.orderPizza) {
    restaurant.orderPizza('mushrooms', 'spinach')
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach') // check first if function exists
*/

/* 9.108: THE NULLISH COALESCING OPERATOR (??)
 * ---------------------------------------------------------------------
 *
 */

/*
// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10
console.log(guestCorrect)
*/

/* 9.110: LOOPING ARRAYS: THE FOR OF LOOP
 * ---------------------------------------------------------------------
 *
 */

const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const item of menu2) console.log(item);
for (const item of menu2.entries()) console.log(item); // entries ~ enumenarate
// Destructuring in for loop
for (const [i, el] of menu2.entries()) console.log(`${i}: ${el}`);

/* 9.111: ENHANCED OBJECT LITERALS
 * ---------------------------------------------------------------------
 * See code in the beginning
 */

/* 9.111: ENHANCED OBJECT LITERALS
 * ---------------------------------------------------------------------
 * See code in the beginning
 */

/* 9.112: OPTIONAL CHAINING
 * ---------------------------------------------------------------------
 *
 */

if (restaurant.openingHours.mon) {
    console.log(restaurant.openingHours.mon);
}

if (restaurant.openingHours.fri) {
    console.log(restaurant.openingHours.fri);
}

if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);

// With optional chaining
console.log(restaurant.openingHours.mon?.open); // undefined instead of error
// console.log(restaurant.openingHours.mon.open) // ERROR

// Compare this new syntax with
console.log(restaurant.openingHours?.mon?.open);

// the old syntax:
if (restaurant.openingHours && restaurant.openingHours.mon)
    console.log(restaurant.openingHours.mon.open);

// EXAMPLE

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
    const open = restaurant.openingHours[day]?.open;
    console.log(`On ${day}, we open ${open}`); // Works but we get "... we open undefined" for mon, tue, wed, sun. See next example on how we solve for this
}

// Solving for the problem with undefined days
for (const day of days) {
    const open = restaurant.openingHours[day]?.open ?? 'closed';
    console.log(`On ${day}, we open ${open}`); // Works but we get "... we open undefined" for mon, tue, wed, sun. See next example on how we solve for this
}

// Methods

console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? ' Method does not exist');

// Arrays

const users = [];
console.log(users[0]?.name ?? 'Users array empty');

/* 9.112: LOOPING OBJECTS
 * ---------------------------------------------------------------------
 *
 */

const properties = Object.keys(openingHours);
console.log(properties); // ['thu', 'fri', 'sat']

for (const day of Object.keys(openingHours)) console.log(day); // thu fri sat

let openStr = `We are open on ${properties.length} days, `; // We are open on 3 days, thu, fri, sat
for (const day of properties) openStr += `${day}, `;
console.log(openStr);

// Property values
const values = Object.values(openingHours);
console.log(values); // [{open: 12, close: 22}, {open: 11, close 23}, {open: 0, close: 24}]

// Entire object with use of destructuring [key, {open, close}]
const entries = Object.entries(openingHours);
console.log(entries);

for (const [key, { open, close }] of entries)
    console.log(`On ${key} we open at ${open} and close at ${close}`); // On thu we open at 12 and close at 22 ......

/* 9.113: SETS
 * ---------------------------------------------------------------------
 * Can hold mxied datatypes
 * Can not hold duplicates
 * Similar to an array
 * iterable
 * Order of the items in the set is irrelevant
 * Main use case is to remove duplicate values from arrays
 */

const orderSet = new Set([
    'Pasta',
    'Pizza',
    'Pizza',
    'Risotto',
    'Pasta',
    'Pizza',
]);

console.log(orderSet); // Oasta, Pizza, Risotto
console.log(new Set('Jonas')); // {'J', 'o', 'n', 'a', 's'}
console.log(orderSet.size); // 3
console.log(orderSet.has('Pizza')); // true
console.log(orderSet.has('Bread')); // false
orderSet.add('Garlic Bread');
orderSet.add('Garlic Bread');
orderSet.delete('Risotto');
console.log(orderSet);
console.log(orderSet[0]); // undefined - You cannot retrieve items from a set
// orderSet.clear() // Delete all items
for (const order of orderSet) console.log(order); // Pasta Pizza Garlic Bread

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
console.log(staffUnique);
const staffUniqueArr = [...staffUnique];
console.log(staffUniqueArr);

// How many unique positions?
console.log(
    new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size // 3
);

console.log(new Set('jonasschmedtmann').size); // 11 unique characters

/* 9.113: MAPS FUNDAMENTALS
 * ---------------------------------------------------------------------
 * Main difference between objects and maps is that in maps, the keys can
 * have any type, whereas in objects can only be strings.
 *
 */

const rest = new Map();
rest.set('name', 'Classico Italiano');
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); // Returns the set
// This works since the set method returns the updated set
rest.set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set('open', 11)
    .set('close', 23)
    .set(true, 'We are open :D')
    .set(false, 'We are closed :(');

console.log(rest.get('name'));
console.log(rest.get('true'));

const time = 21;
rest.get(time > rest.get('open') && time < rest.get('close'));

console.log(rest.has('categories'));
rest.delete(2);
console.log(rest);
console.log(rest.size);
// rest.clear(); // Clear all elements

rest.set([1, 2], 'Test');
console.log(rest.get([1, 2])); // undefined - its not the same object as the above [1, 2].

// You would need to do this

const arr3 = [1, 2];
rest.set(arr3, 'Test');
console.log(rest.get(arr3)); // Works

rest.set(document.querySelector('h1'), 'Heading'); // Works

/* 9.114: MAPS: ITERATION
 * ---------------------------------------------------------------------
 *
 */

// Please note that this is an array of arrays
const question = new Map([
    ['question', 'What is the best programming in the world'],
    [1, 'C'],
    [2, 'Java'],
    [3, 'JavaScript'],
    ['correct', 3],
    [true, 'Correct!'],
    [false, 'Try again'],
]);

// Please also note that it is an array of arrays that is returned by the function call Object.entries()
// This means it is easy to convert a set to an array and vice versa
/*
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

console.log(question);
// Quiz app
console.log(question.get('question'));
// Map is not iterable so we need to convert it to a array
for (const [key, value] of question) {
    if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = Number(prompt('Your answer'));
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log(...question);
console.log([...question.keys()]);
console.log([...question.values()]);

*/

/* 9.115: SUMMARY WHICH DATA STRUCTURE TO USE AND WHEN
 * ---------------------------------------------------------------------
 See slide pack
*/
