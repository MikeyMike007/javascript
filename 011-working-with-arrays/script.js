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

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    /*
     *
     * Please note that we use slice here below when we sort the movements array
     * since we dont want to change the underlying movements arrray (remember
     * the sort() method is mutating). We use the slice method to take a copy.
     *
     */
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
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

const calcPrintBalance = (acc) => {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${acc.balance} €`;
};

const calcDisplaySummary = (acc) => {
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;

    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
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

const updateUI = (acc) => {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcPrintBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

console.log(accounts);

/* 11.156: IMPLEMENTING LOGIN */

// vent handlers
let currentAccount;

btnLoan.addEventListener('click', (e) => {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (
        amount > 0 &&
        // Loan is only granted if there is any deposit that exceeds 10%
        // of the requested loan amount
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // Add movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
});

btnLogin.addEventListener('click', (e) => {
    /*
     * Since the btnLogin button is a button in a form element, the page is
     * reloaded everytime when the button is clicked. We want toprevent this from
     * happening so we need to implement following method:
     */
    e.preventDefault();
    currentAccount = accounts.find(
        (acc) => acc.userName === inputLoginUsername.value
    );
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // display UI and welcome message
        labelWelcome.textContent = `Welcome back,
        ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Clear inputfields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur(); // Makes the cursor stop blinking at the pin cell

        updateUI(currentAccount);
    }
    // Use ? so it doesnt throw an error if the account doesnt exist
});

btnTransfer.addEventListener('click', (e) => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const recieverAcc = accounts.find(
        (acc) => acc.userName === inputTransferTo.value
    );

    inputTransferAmount.value = inputTransferTo.value = '';

    if (
        amount > 0 &&
        recieverAcc &&
        currentAccount.balance >= amount &&
        recieverAcc?.userName !== currentAccount.userName
    ) {
        currentAccount.movements.push(-amount);
        recieverAcc.movements.push(amount);
        updateUI(currentAccount);
    }
});

btnClose.addEventListener('click', (e) => {
    e.preventDefault();

    if (
        inputCloseUsername.value === currentAccount.userName &&
        Number(inputClosePin.value) === currentAccount.pin
    ) {
        const index = accounts.findIndex(
            (acc) => acc.userName === currentAccount.userName
        );
        // Delete account
        accounts.splice(index, 1);

        // Hide UI
        containerApp.style.opacity = 0;

        inputCloseUsername.value = inputClosePin.value = '';
    }
});

let sorted = false;
btnSort.addEventListener('click', (e) => {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

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

/* 11.159 SOME AND EVERY */

console.log('---------------11.159 SOME AND EVERY---------------');

console.log(movements);

// SOME
console.log('SOME:');

// EQUALITY
console.log(movements.includes(-130)); // true

// CONDITION
console.log(movements.some((el) => el > 0)); // true
console.log(movements.some((el) => el >= 1500)); // true
console.log(movements.some((el) => el >= 3001)); // false

// EVERY
console.log('EVERY:');
// returns true if all elements in an array satisfies the specified logical
// criteria. Takes a callback function as input

console.log(movements.every((mov) => mov > 0)); // false
console.log(account4.movements.every((mov) => mov > 0)); // true

// SEPARATE CALLBACK
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(account4.movements.every(deposit)); // true
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300];

/* FLAT AND FLATPACK METHODS */
const arr3 = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr3.flat()); // [1, 2, 3, 4, 5, 6, 7, 8] (de-nestes an array in one level)

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // [1, 2, 3, 4, 5, 6, 7, 8] (de-nestes an array in two levels)

const accountMovements = accounts.map((acc) => acc.movements);
console.log(accountMovements); // array of arrays of all movements i.e.
// [account1.movements, account2.movements, .., ...]

const allMovements = accountMovements.flat();
console.log(allMovements); // all movements unnested
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// map and then flat is a common operation so its implemented as standard

const overallBalance3 = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance3);

/*
 *
 * 11.156 SORTING ARRAYS
 *
 */

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort(); // Mutates the underlying array
console.log(owners);

console.log(movements);
//console.log(movements.sort()); // Numbers not in order, doesnt make any sense
// This is due to that the algortihm first converts the numbers to strings and
// then sorts it

// return < 0, A, B
// return > 0, B, A

// Ascending
movements.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
});
console.log(movements);

// Descending
movements.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
});
console.log(movements);

// Ascending
movements.sort((a, b) => a - b);

// Desending
movements.sort((a, b) => b - a);

/* 11.162 MORE WAYS OF CREATING AND FILLING ARRAYS */
const arr5 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(new Array(1, 2, 3, 4, 5, 6, 7, 9));
const x = new Array(7);
console.log(x);
console.log(x.map(() => 5));
x.fill(1, 3);
console.log(x);
x.fill(1, 3, 5);
console.log(x);
arr.fill(23, 2, 6);

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (curr, i) => i + 1);

/////////////////////////////////////////////////;
