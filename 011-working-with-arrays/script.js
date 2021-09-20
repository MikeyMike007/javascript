'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
        // If we would use 'beforeend' below the balance movements would be
        // in another order (inverted)
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

displayMovements(account1.movements);

const calcPrintBalance = (movements) => {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance} €`;
};
calcPrintBalance(account1.movements);

const calcDisplaySummary = (movements) => {
    const incomes = movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const out = movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * 1.2) / 100)
        .filter((int, i, arr) => {
            // New rule, bank only pays out interest if its above 1€
            // So we need to filter out the interest from the map function
            // in the prior step in the pipeline
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);

const createUsenames = (accs) => {
    accs.forEach((acc) => {
        // We use the foreach method because we do not want to create a new array
        // we basically want to modify the current array
        // Please also note that we do not return anything in this function as we are
        // directly modifying the input variable acc in the forEach function (forEach
        //  has an mutating ability)
        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('');
    });
};

createUsenames(accounts);
console.log(accounts);
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new map([
//     ['usd', 'united states dollar'],
//     ['eur', 'euro'],
//     ['gbp', 'pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/* 11.141: SIMPLE ARRAY METHODS */

// SLICE

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // Array(3) -> ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // Array(2) -> ['c', 'd'] (Actually returns 2 and 2 i.e. not 4) This means that arr.slice(i,j) returns a new array with the elements i and j-1
console.log(arr.slice(-2)); // ['d', 'e'] Returns second last element up until the last element
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice()); // Same as console.log([...arr]);

// SPLICE
console.log(arr.splice(2));
console.log(arr);
console.log(arr.splice(-1)); // Pops off the last element

arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 3)); // ['b', 'c', 'd']
console.log(arr);

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// CONCAT
arr = ['a', 'b', 'c', 'd', 'e'];
arr2 = ['j', 'i', 'h', 'g', 'f'];
const letters = arr.concat(arr2);
console.log(letters);
const letters2 = [...arr, ...arr2];
console.log(letters2);

// JOIN
const letterStr = letters.join(letters, '-');
console.log(letterStr);

/* 11.142: LOOPING ARRAYS: forEach */

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]; // Pos: deposit - Neg: Withdrawal

// FOR OF LOOP
for (const movement of movements) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    } else {
        console.log(`You withdraw ${Math.abs(movement)}`);
    }
}

// MORE SMOOTH WAY

console.log('--------FOR EACH----------');
movements.forEach(function (movement) {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    } else {
        console.log(`You withdraw ${Math.abs(movement)}`);
    }
});

// SAME BUT WITH ARROW
console.log('--------FOR EACH (ARROW)----------');
movements.forEach((movement) => {
    if (movement > 0) {
        console.log(`You deposited ${movement}`);
    } else {
        console.log(`You withdraw ${Math.abs(movement)}`);
    }
});

// But what happends if we need access to the counter itself

// OLD WAY:
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
    }
}

// FOREACH METHOD
console.log('--------FOR EACH (ARROW)----------');
movements.forEach((movement, i, array) => {
    // The names doesnt matter but the order does - the i is the index, the array is the array which we are looping over. This doesnt need to be provided if you dont needed
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
    }
});

/* 10.143 `forEach` WITH MAPS AND SETS */

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach((value, key, map) => {
    console.log(`${key}: ${value}`); // key is the same as value (sets dont have keys or indexes either)
    // the key doesnt make any sense in a set
});

//to avoid confusion you could call the forEach method with following parameters
//  currenciesUnique.forEach((value, _value, map) => {
// since value and _value is basically the same thing

/* 10.147: DATA TRANSFORMATION: MAP, FILTER AND REDUCE */

/* 10.148: THE MAP METHOD */
console.log('10.148: THE MAP METHOD');

// MODERN WAY WITH MAP
const euroToUSD = 1.1;

const movementUSD = movements.map((el) => el * euroToUSD);
// NOT RECOMMENDED WAY
const movementUSD2 = [];
for (const movement of movements) {
    movementUSD2.push(movement * euroToUSD);
}

console.log(movements);
console.log(movementUSD);
console.log(movementUSD2);

const movementDescriptions = movements.map((el, i) => {
    if (el > 0) {
        return `Movement ${i + 1}: You deposited ${el}`;
    } else {
        return `Movement ${i + 1}: You withdraw ${Math.abs(el)}`;
    }
});
console.log(movementDescriptions);

/*
0: "Movement 1: You deposited 200"
1: "Movement 2: You deposited 450"
2: "Movement 3: You withdraw 400"
3: "Movement 4: You deposited 3000"
4: "Movement 5: You withdraw 650"
5: "Movement 6: You withdraw 130"
6: "Movement 7: You deposited 70"
7: "Movement 8: You deposited 1300"
*/

/* 10.149: COMPUTING USERNAMES */

// See above

/* 11.150 THE FILTER METHOD */

const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

// const deposits = movements.filter((mov) => {
//     return mov > 0;
// });

// const withdrawals = movements.filter((mov) => {
//     return mov < 0;
// });

// NON-MODERN METHOD WITH for of
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

/* 11.151 THE REDUCE METHOD */

const balance = movements.reduce((acc, curr) => acc + curr, 0); // last variable specifies the first value of the accumulator, default is 0
console.log(balance);

// Old method
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value

const max = movements.reduce(
    (acc, mov) => (acc > mov ? acc : mov),
    movements[0]
);
/*
 * Could also use: return Math.max(acc, mov);
 *
 */

const totalDepositsUSD = movements
    .filter((mov) => mov > 0)
    .map((mov) => mov * euroToUSD)
    .reduce((acc, mov) => acc + mov, 0);

/* 11.155: THE FIND METHOD */

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal); // -400 // -400

const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account);
/////////////////////////////////////////////////
