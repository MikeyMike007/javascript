'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

/* 9.124: STRING METHODS PRACTISE
 * ---------------------------------------------------------------------
 *
 */

const getCode = (str) => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';');
    const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
        '_',
        ' '
    )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(
        36
    );
    console.log(output);
}

/* 9.120: WORKING WITH STRINGS - PART1
 * ---------------------------------------------------------------------
 *
 */

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length);
console.log('B737'.length);

console.log(airline.indexOf('r')); // First
console.log(airline.lastIndexOf('r')); // Last r
console.log(airline.indexOf('Portugal')); // case sensitive

console.log(airline.slice(4)); // Air Portugal - Element at which slice method start to extract (DO NOT MODIFY UNDRLYING ELEMENT SINCE PRIMITIVE)
console.log(airline.slice(4, 7)); // Air

console.log(airline.slice(0, airline.indexOf(' '))); // First word: TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); // Last word: Portugal

console.log(airline.slice(-2)); // al
console.log(airline.slice(1, -1)); // AP Air Portuga

const checklMiddleSeat = function (seat) {
    // B and E are middle seat
    const s = seat.slice(-1);
    if (s === 'B' || s === 'E') console.log('You got the middle seat');
};

checklMiddleSeat('11B');
checklMiddleSeat('23C');
checklMiddleSeat('3E');

console.log(new String('jonas'));

/* 9.121: WORKING WITH STRINGS - PART1
 * ---------------------------------------------------------------------
 *
 */

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect = passenger[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Check email

const email = 'hello@jonas.io';

const loginEmail = '  Hello@Jonas.Io\n';
const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim();
console.log(trimmedEmail);

const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.');
console.log(priceUS);
const announcement =
    'All passengers come to boarding door 23. Boarding door 23!';
console.log(announcement.replace('door', 'gate'));

// Regular expressions

console.log(announcement.replace(/door/g, 'gate'));

// Booleans
const plane1 = 'Airbus A320neo';

console.log(plane1.includes('A320')); // true
console.log(plane1.includes('Boeing')); // false
console.log(plane1.startsWith('Airb')); // true

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('Part of the new Airbus family');
}

const checkBaggage = function (items) {
    const baggage = items.toLowerCase();

    if (baggage.includes('knife') || baggage.includes('gun')) {
        console.log('you are not welcome aboard');
    } else {
        console.log('Welcome aboard');
    }
};

checkBaggage('I have a laptop, some food and a Pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

/* 9.122: WORKING WITH STRINGS - PART 3
 * ---------------------------------------------------------------------
 * split() method: String -> Array
 * join() mmethod: Array -> String
 */

console.log('a+very+nice+string'.split('+')); // ['a', 'very', 'nice', 'string']
console.log('Jonas Schmedtmann'.split(' ')); // ['Jonas', 'Schmedtmann']
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(firstName, lastName);

const newName = ['Mr', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
    const names = name.split(' ');
    const namesUpper = [];

    for (const n of names) {
        // namesUpper.push(n[0].toUpperCase() + n.slice(1));
        namesUpper.push(n.replace(n[0], n[0].toUpperCase())); // Same as above
    }

    console.log(namesUpper.join(' '));
};

capitalizeName('jessica anna smith davis');
capitalizeName('jonas Schmedtmann');

// Padding

const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
    const str = number + '';
    const last = str.slice(-4);
    return last.padStart(str.length, '*');
};

console.log(maskCreditCard('334872727328349272743')); // ***************2743

// Repeat
const message2 = 'Bad weather ... All departures delayed...';
console.log(message2.repeat(5));

const planesInLine = function (n) {
    console.log(`there are ${n} planes in line ${'✈'.repeat(n)}`);
};

planesInLine(5);
