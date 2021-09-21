# 011 - WORKING WITH ARRAYS

## 11.141: SIMPLE ARRAY METHODS

Methods are functions that we can call on objects.
They are attached to objects.

`Arrays` are objects and they access to some special methods that we can use as
tools on the arrays.

### SLICE METHODS

With the `slice()` method, we can extract a part of an array without changing
the original array.

So, with the function call `arr.slice(i,j)` (on an array called `arr`), it will
return a new array copy with the items `i` up until `j-1` from the original
array. Please note that the slice method will not in anyway change the original
array.

Examples:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2)); // ['c', 'd', 'e']
console.log(arr.slice(2, 4)); // ['c', 'd']
console.log(arr.slice(-2)); // ['d', 'e']
console.log(arr.slice(1, -2)); // ['b', 'c']
console.log(arr.slice()); // Same as console.log([...arr]);
```

### SPLICE METHOD

The `splice()` method works almost in the same way as the `slice()` method. The
main difference is that the `splice()` method changes the underlying array. So,
the `splice()` method returns the elements that are to be extracted and deletes
them from the original array. You could see this method as if we want to "carve
out" some elements from the original array.

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(2)); // ['c', 'd', 'e']
console.log(arr); // ['a', 'b']
```

One common use case is to pop off the last element of an array:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(-1)); // ['e']
console.log(arr); // ['a', 'b', 'c', 'd']
```

The syntax is also little different with respect of the arguments, so the method
call `arr.splice(i, j)` means that starting from element i, the splice method
will return and cut off the next `j` elements (including element `i`);

Example:

```javascript
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(1, 3)); // ['b', 'c', 'd']
console.log(arr); // ['a', 'e']
```

### REVERSE METHOD

The `reverse()` method reverses the order of an array and returns that
array.Please note that the `reverse()` method mutates (changes) the original
array and returns a reference to the same changed array.

Example:

```javascript
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ['f', 'g', 'h', 'i', 'j']
console.log(arr2); // ['f', 'g', 'h', 'i', 'j']
```

### CONCATENATE METHOD

The concatenate method merges the contents of two arrays and returns it. Please
note that it doesn't mutate the original array i.e. the original array stays the
same.

```javascript
arr = ['a', 'b', 'c', 'd', 'e'];
arr2 = ['j', 'i', 'h', 'g', 'f'];
const letters = arr.concat(arr2);
console.log(letters); // ['a', 'b', 'c', 'd', 'e', 'j', 'i', 'h', 'g', 'f']
console.log(arr); // ['a', 'b', 'c', 'd', 'e']

const letters2 = [...arr, ...arr2]; // Exactly the same as the concat method
console.log(letters2); // ['a', 'b', 'c', 'd', 'e', 'j', 'i', 'h', 'g', 'f']
```

Also note that the results of the `concat()` method can be achieved with
`[...arr1, ...arr2]`.

### JOIN METHOD

The join method converts an array to a string where a specified separator binds
the array elements together. Please note that the `join` method doesn't change
the underlying array.

Example:

```Javascript
const arr = ['a', 'b', 'c'];
const strArr = arr.join(arr, '-')
console.log(strArr); // "a-b-c"
```

## 11.142 LOOPING ARRAYS WITH: `forEach()`

As in the same way as with the `for (const arrElement of arr)`, you can also use
the `forEach()` method to loop over arrays.

This could be best illustrated with these examples:

Example 1 (With `for of`):

```javascript
// Pos: deposit - Neg: Withdrawal
// movements = bank account movements
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
    }
}
```

Example 2 (with `forEach`)

```javascript
// positive value: deposit - negative value: withdrawal
// movements = bank account movements
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach((movement, i, array) => {
    /*
The names of the arguments doesn't matter but the order does - the i is the
index, the array is the array which we are looping over and movement is the
current array element. Please note that the i and array are optional. These
values doesn't need to be provided if you don't need them.
*/
    if (movement > 0) {
        console.log(`Movement ${i + 1}: You deposited ${movement}`);
    } else {
        console.log(`Movement ${i + 1}: You withdraw ${Math.abs(movement)}`);
    }
});
```

One main difference with the `for of` and `forEach()` method is that you cannot
use `break` and `continue` inside the `forEach()` method.

## 11.143 `forEach` WITH MAPS AND SETS

### MAPS

This basically works as the same way as with arrays (please see prior chapter).
Best illustrated with an example:

```javascript
const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});
```

Output:

```
USD: United States dollar
script.js:179 EUR: Euro
script.js:179 GBP: Pound sterling
```

### SETS

The `forEach` method exists also on sets but with the difference that sets does
neither have any index or key. So the `key` in the callback fucntions returns
basically the current value.

Example:

```javascript
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach((value, key, map) => {
    console.log(`${key}: ${value}`);
});
```

Output:

```
USD: USD
GBP: GBP
EUR: EUR
```

To avoid confusion, you could write the callback function as,

```javascript
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach((value, _value, map) => {
    console.log(`${key}: ${value}`);
});
```

## 11.145: PROJECT: THE BANKIST APP

Following illustrates the flowchart for the current bank app:

![flowchart_bankist](img/flowchart_bankist.png)

We are storing accounts (which are objects) into arrays. This is just to
replicate if we would get the data from an web API.

## 11.146 CREATING DOM ELEMENTS

Lets say that we have following object that we want to populate into an bank app
UI.

```javascript
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};
```

The container for which we want to populate looks like following:

![container](img/container.png)

The container element that we want to populate inside the container has the
following `html` code:

```html
<div class="movements__row">
    <div class="movements__type movements__type--deposit">2 deposit</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">4 000€</div>
</div>
```

And, the container itself, with the following styling,

```css
.movements {
    grid-row: 2 / span 3;
    background-color: #fff;
    border-radius: 1rem;
    overflow: scroll;
}
```

Whereas the element itself, that we want to populate inside the container has the
following styling,

```css
.movements__row {
    padding: 2.25rem 4rem;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eee;
}
```

So,in order to populate the container, we can write the following code,

```javascript
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movements__row">
          <div class="movements__type 
          movements__type--deposit">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
        // If we would use 'beforeend' below the balance movements would be
        // in another order (inverted)
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

displayMovements(account1.movements);
```

Please note that the variable `containerMovements` are pointing towards the
container i.e. `const containerMovements = document.querySelector('.movements');`
and that the function `insertAdjacentHTML` is used to populate the html code
inside this container. We use the argument `'afterbegin'` to get the elements in
the right order. If we would instead use `'beforeend'` we would flip the order.

With this code in place, we are now able to populate the movements:

![movements_container_populated](img/movements_container_populated.png)

## 11.146: CODING CHALLENGE #1

```javascript
///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners
about their dog's age, and stored the data into an array (one array for each).
For now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less
than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages
('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually
have cats, not dogs! So create a shallow copy of Julia's array, and remove the
cat ages from that copied array (because it's a bad practice to mutate function
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult
("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is
still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// 1

let dataJulia = [3, 5, 2, 12, 7];
let agesDogsJulia = dataJulia.slice();
agesDogsJulia.splice(-1);
agesDogsJulia.splice(0, 1);

let agesDogsKate = [4, 1, 15, 8, 3];

// 2

const data = agesDogsJulia.concat(agesDogsKate);
console.log(data);

//3

data.forEach((age, i) => {
    if (age >= 3)
        console.log(`Dog number ${i + 1} is an adult and is ${age} years old`);
    else console.log(`Dog number ${i + 1} is a puppy and is ${age} years old`);
});
```

## 11.147 DATA TRANSFORMATIONS: MAP, FILTER AND REDUCE

### MAP METHOD

`map` is similar to the `forEach` method. The only difference is that `map`
returns a new array while `forEach` modifies the actual array.

`map` returns a new array containing the results of applying an operation on all
original array elements.

### FILTER METHOD

`filter` returns a new array containing the array elements that passed a
specified test conditions.

### REDUCE METHOD

`reduce` boils (reduces) all array elements down to one single value (e.g.
adding all elements together):

## 10.148 THE MAP METHOD

The `map` method loops though every element of an array and performs an
operation and based on the return of these operation, returns a new array
without modifying the original array.

The `map` method, has also, through a callback function access to the elements
properties `value`, `index`, `array` of the array. Please note that the names of
these properties can be whatever, what is important is the order of how they are
specified.

First, as just to illustrate the method, lets see an example on how developers
used to perform calculations before the `map` method was added to javascript.

Example:

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;
const movementsUSD = [];
for (const movement of movements) {
    movementUSD.push(movement * euroToUSD);
}
console.log(movementUSD);
```

Now, lets illustrate how you can do this with the `map` method.

Example 1:

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euroToUSD = 1.1;
const movementUSD = movements.map((el) => el * euroToUSD);
console.log(movementUSD);
```

Example 2:

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const movementDescriptions = movements.map((el, i) => {
    if (el > 0) {
        return `Movement ${i + 1}: You deposited ${el}`;
    } else {
        return `Movement ${i + 1}: You withdraw ${Math.abs(el)}`;
    }
});
console.log(movementDescriptions);
```

Output:

```
0: "Movement 1: You deposited 200"
1: "Movement 2: You deposited 450"
2: "Movement 3: You withdraw 400"
3: "Movement 4: You deposited 3000"
4: "Movement 5: You withdraw 650"
5: "Movement 6: You withdraw 130"
6: "Movement 7: You deposited 70"
7: "Movement 8: You deposited 1300"
```

## 10.149 COMPUTING USERNAMES

Following lecture explained a smooth way to create usernames from arrays of
objects using the `forEach` method. The reason for using the `forEach` method is
that it has a mutable ability to change the underlying array. You can compare
this to the `map` method that doesnt mutate its underlying array but instead
returns a copy of the underlying array.

In this chapter, following code was specified in the bankist app:

```javascript
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

// account2,3,4 are similar objects with different fictional names

const accounts = [account1, account2, account3, account4];
const createUsenames = (accs) => {
    accs.forEach((acc) => {
        /*
         * Please also note that we do not need return anything in this
         * function as we are directly modifying the underlying array though the
         * input variable acc in the forEach function (forEach
         * has an mutating ability)
         */
        acc.userName = acc.owner
            .toLowerCase()
            .split(' ')
            .map((name) => name[0])
            .join('');
    });
};

createUsenames(accounts);
console.log(accounts);
```

Please also note that we do not need to return anything in the `forEach`
function since it already can modify the underlying array though the argument i
the callback function (`acc`).

## 11.150 THE FILTER METHOD

Is used for filter for elements that fulfill a certain logical criteria. In this
chapter, we sorted out the deposits and withdrawals from a array with account
movements depending of if the element in the movements array were a positive
value (deposit) or a negative value (withdrawal).

See example:

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// First, lets illustrate how this is dont with the for of loop (unmodern method)
const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);

// Now, lets see how this is done with the more modern filter method
const deposits = movements.filter((mov) => mov > 0);
const withdrawals = movements.filter((mov) => mov < 0);

// Also, Please note that the filter methods above is the exactly the same as
// for the commented code below
// const deposits = movements.filter((mov) => {
//     return mov > 0;
// });

// const withdrawals = movements.filter((mov) => {
//     return mov < 0;
// });
```

## 11.151 THE REDUCE METHOD

The reduce method can perform an operation on the underlying array to then
return a single value. Please note that the arguments in the callback function
in the `reduce` method are little different from the other array methods.

-   First argument: This is an accumulator. It is essentially a snowball variable
    that keeps to accumulate the variable that we want to return.
-   Second argument: This is the current variable that the method progresses

In this lecture, two different examples was shown, one were you accumulate the
whole sum of the `movements` array and another one where you loop over the same
array and return the maximum value of array. Please see examples below,

### EXAMPLE 1 ACCUMULATIVE SUM OF AN ARRAY

```javascript
/*
 * Lets first illustrate how you do this with the for of method
 */
let balance2 = 0;
for (const mov of movements) balance2 += mov;

/*
 * Now, with the reduce() method
 */
const max = movements.reduce(
    (acc, mov) => (acc > mov ? acc : mov),
    movements[0] /* movements[0] = STARTING VALUE OF ACCUMULATOR */
);

/*
 * You could also do the same using the Math.max() function
 */

const max2 = movements.reduce((acc, mov) => Math.max(acc, mov), movements[0]);
```

### EXAMPLE 2

```javascript
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const calcPrintBalance = (movements) => {
    const balance = movements.reduce((acc, mov) => acc + mov, 0);
    labelBalance.textContent = `${balance} €`;
    // labelBalance is one UI element in the bankist app that displays the
    // total balance of the bank account
};
calcPrintBalance(account1.movements);
```

## 11.152 CODING CHALLENGE 2

Please see the coding challenge below,

```javascript
///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to
convert dog ages to human ages and calculate the average age of the dogs in
their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages
('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog
is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge
= 16 + dogAge * 4.

2. Exclude all dogs that are less than 18 human years old
(which is the same as keeping dogs that are at least 18 years old)

3. Calculate
the average human age of all adult dogs (you should already know from other
challenges how we calculate averages 😉) 4. Run the function for both test
datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3] TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀

*/
const calculateAverageAge = (ages) => {
    const humanYears = ages.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));
    const adults = humanYears.filter((age) => age >= 18);
    return adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
};

console.log(`Average: ${calculateAverageAge([5, 2, 4, 1, 15, 8, 3])}`); //44
```

## 11.153 THE MAGIC OF CHAINING METHODS

Please note that functions such as `filter`, `map` and `reduce` return copies of
the underlying array it performs its operations on. Due to this feature, we dont
need to split up our code in different separate actions. Instead, we could use a
single codechain and create a pipeline of operations.

One such example is when we want to convert all the deposits to USD and then
after conversion, accumulate these into a sum. Please see example below.

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const totalDepositsUSD = movements
    /*
     *  Please note that the input parameters to the filter((el, index, array))
     *  method below comes from original array that is inserted into the array.
     */
    .filter((mov) => mov > 0)
    /*
     * Please note that the input parameters to the map((el, index, array))
     * method comes from the returned array from the prior operation in the
     * chain, i.e., in this case, after all positive currency movements (deposits)
     * have been filtered in and returned.
     */
    .map((mov) => mov * euroToUSD)
    /*
     * Please note that the input parameters to the reduce((acc, mov))
     * method comes from the returned array from the prior operation in the
     * chain, i.e., in this case, after all deposits have been converted to USD.
     */

    /*
     * The last operation basically aggregates all the USD deposits together
     * using the reduce method
     */
    .reduce((acc, mov) => acc + mov, 0);
```

In this chapter, we also used the following taught techniques to update the
bankist app with methodology for estimating the aggregated deposits and
withdrawals. The earned interest is also computed. See example below,

```javascript
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
            // Bank Rule, bank only pays out interest if its above 1 €
            // So we need to filter out the interest from the map function
            // in the prior step in the pipeline
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
};

calcDisplaySummary(account1.movements);
```

Please note that it is not recommended to overuse chaining so we should try to
optimize it since it can cause real performance issues if we have really huge
arrays. So if we have a huge chain of methods, chained one after the other, we
should try to compress the functionality of what they do into as little methods
as possible. For example, sometimes we create way more map methods than we
actually need where we could just do it all in just one map.

So when you chain methods, keep look for opportunities of keeping up your code
performance. Also, it is considered bad practise in JavaScript to chain methods
that mutate the underlying original array, and an example of such method is
`splice`. To repeat, you should not chain splice or reverse methods.

## 11.154 CODING CHALLENGE 3

```javascript
///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = (ages) =>
    ages
        .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
        .filter((age) => age >= 18)
        .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
// adults.length

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);
```

## 11.155 THE FIND METHOD

We can use the `find` method to retrieve an element of an array based on one
condition. Basically, it returns the first element of the array that satisfies the
specified condition.

The find method is a bit simiular to the filter method, but, there are two
fundamental diffferences,

1. `filter` returns all the elements that match the condition while the `find`
   method only returns the first element.
2. `filter` method returns a new array while `find` only returns the element
   itself and not an array.

Please see following example of an illustration on how the `find` works,

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const firstWithdrawal = movements.find((mov) => mov < 0);
console.log(firstWithdrawal); // -400 // -400
```

Another example is that you can retrieve a whole object based on the criteria of
a object parameter,

```javascript
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

const account = accounts.find((acc) => acc.owner === 'Jessica Davis');
console.log(account); // Logs Jessica Davis whole account object
```

## 11.156 IMPLEMENTING LOGIN

In this chapter, we implemented the login functionality and displaying the
correct data in the UI dependent on who the user is. Ill enclose the code below
that were implemented:

```javascript
let currentAccount; // global variable of the current account that is logged in

// btnLogin is the login button - see below
btnLogin.addEventListener('click', (e) => {
    /*
     * Since btnLogin is a button in a form element, the whole page will
     * reload every time when the button is clicked, unless we prevent that
     * from happening. This can be done by calling the function preventDefault
     * from the event handler e.
     */
    e.preventDefault();

    /*
     * The code below will read username from inputLoginUserName and return the
     * first account that it finds with that exact same username in the account array
     * i.e. acc.userName
     */
    currentAccount = accounts.find(
        (acc) => acc.userName === inputLoginUsername.value
    );

    /*
     * If the pin number that the user inserted in inputLoginPin is exactly the
     * same as the users pin number read from the object currentAccount, then,
     * 1) Display a welcome message saying Welcome first name where first name is
     *    to be found using the split method on the name stated in currentAccount.owner
     *
     *    Please note that we are using ? after current account to avoid
     *    error messages if the user would enter a faulty pin number. Instead, nothing
     *    will happen as the statement below with the ? will throw an undefined
          value.
     */
    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // display UI and welcome message
        labelWelcome.textContent = `Welcome back,
        ${currentAccount.owner.split(' ')[0]}`;

        // Show the container - it has currently opacity of 0 which means it is
        // invisible
        containerApp.style.opacity = 100;

        // Clear all the input fields i.e. Username and Pin
        inputLoginUsername.value = inputLoginPin.value = '';
        // Make the cursor stop blinking in the Pin field
        inputLoginPin.blur();

        // Display movements
        displayMovements(currentAccount.movements);

        // Display balance
        calcPrintBalance(currentAccount.movements);

        // Display summary
        calcDisplaySummary(currentAccount);
    }
});
```

We also needed to modify the function `calcDisplaySummary` to accommodate for the
input of an account instead of movements. This due to that every user has a
different interest rate. So this means that interest earned are different for
every other user.

```javascript
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
```

## 11.157 IMPLEMENTING TRANSFERS

In the following chapter, we have implemented the transfer functionality in the
bankist app.

The main functionality was implemented as an event listener for the button
`btnTransfer`,

```javascript
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
```

We also created refactored some code into a function named `updateUI` that takes
an account (currentAccount) as an argument.

```javascript
const updateUI = (acc) => {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcPrintBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};
```

We also refactored the same code `updateUI` for the other event listener as well
(`btnLogin`).

## 11.158 THE `findIndex` method

In this chapter, functionality for deleting an account is implemented. This is
done by using the use the `splice` method. But in order to use the splice
method, we need to know at which index number the account has that we wish to
delete.

Please note the difference between the `indexOf` method and the `findIndex`
method.

-   The `indexOf()` method expects a value as first parameter. This makes a good
    choice find the index in arrays of primitive types (string, number or
    boolean).

-   The `findIndex` expects a `callback` function has first parameter. Use this of
    you need the index in arrays with non-primitive types (e.g. objects) or your
    find condition is more complex than just a value.

Example `indexOf()`:

```javascript
var ages = [3, 10, 18, 20];
console.log(ages.indexOf(10)); // 1
```

Example of `findIndex()`:

```javascript
var ages = [3, 10, 18, 20];
console.log(ages.findIndex((age) => age >= 18)); //2
```

Following code were implemented to the bankist app,

```javascript
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
```

The `btnClose` is the closing of account button, `inputCloseUsername` is the
field where you insert your username (the account to be closed) and
`inputClosePin` is the pin for the account to be closed.

## 11.159 `some()` AND `every()` METHODS

### `some()` METHOD

The `some()` method returns true or false if there exists an element inside an
array that fulfills a certain logical requirement. This can be compared to the
more simpler method `includes()`. Please see examples of both below. The main
difference is that `includes()` takes a value and `some()` takes callback
function.

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// EQUALITY
console.log(movements.includes(-130)); // true

// CONDITION
console.log(movements.some((el) => el > 0)); // true
console.log(movements.some((el) => el >= 1500)); // true
console.log(movements.some((el) => el >= 3001)); // false
```

In this chapter, we also added an event listener to the button `btnLoan()` to
implement functionality regarding requesting for new loans. See code below:

```javascript
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
```

### `every()` METHOD

The every method is similar to the `some()` method with the difference that it
returns true or false if **all** elements of the array fulfills the specified
criteria. The method takes a callback function as input. Please see examples
below,

```javascript
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.every((mov) => mov > 0)); // false
console.log(account4.movements.every((mov) => mov > 0)); // true
```

### Separate callback function

This chapter also discussed pros of having a separate callback function (reuse
similar code). Please see examples below,

```javascript
const deposit = (mov) => mov > 0;
console.log(movements.some(deposit)); // true
console.log(movements.every(deposit)); // false
console.log(account4.movements.every(deposit)); // true
console.log(movements.filter(deposit)); // [200, 450, 3000, 70, 1300];
```

## 11.160 `flat()` and `flatMap()` METHODS

Both the flat and `flatMap` method flattens nested arrays. The `flatMap` method
combines both a map method and a flat method since it is kind of a common
operation that developers use so it was incorporated into the standard JavaScript
library recently. Please see examples below,

```javascript
const arrNested = [[1, 2, 3], [4, 5, 6], 7, 8];
/*
 *
 * arrNested.flat() "un-nestes" the array in "one level" which is default
 *
 *
 */
console.log(arrNested.flat()); // Gives: [1, 2, 3, 4, 5, 6, 7, 8]

/*
 *
 * arrDeep is nested in two levels. In this case, you will need to pass an
 * argument to the flat() method, in this case, 2, so it understands that it
 * will need to "un-nest" in two layers.
 *
 *
 */
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // Gives: [1, 2, 3, 4, 5, 6, 7, 8]

/*
 *
 *  Save all the account movements into an array i.e. [account1.movements,
 *  account2.movements, ..., ....]
 *
 */
const accountMovements = accounts.map((acc) => acc.movements);

/*
 *
 *  Flat the accountMovements array in one level
 *
 */
const allMovements = accountMovements.flat();

/*
 *
 * Calculate the total account balance for all accounts
 *
 */
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);

/*
 *
 * Please note that all the previous steps can be done in a nested format i.e.
 * in a pipeline.
 *
 */
const overallBalancePipeline = accounts
    .map((acc) => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);

/*
 *
 * Because map() and flat() method is so commonly used after one another by
 * developers, JavaScript decided to give it a whole separate function called
 * flatMap
 *
 */
const overallBalanceflatMap = accounts
    .flatMap((acc) => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
```

## 11.161 SORTING ARRAYS

The `sort()` method is used for sorting arrays.

Please note that the `sort()` method can be performed on both strings and numbers
Also, it is also important to note that the `sort()` method has a mutating
ability, i.e. it changes the underlying array which it sorts.

Another important feature of the `sort()` method is that if you directly
pass in an array of numbers into the `sort()` method. It will first convert the
values into strings and then sort them.

To sort the array as values, you need to pass an callback function into the
`sort()` method.

```javascript
/*
 *
 * Example of sorting strings
 *
 */
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
owners.sort();

/*
 *
 * Please note that the sort method has now changed the underlying array
 *
 */
console.log(owners);

/*
 *
 * Numbers not in order, doesnt make any sense. This is due to that the
 * algorithms first converts the numbers to strings and then sorts it. In order
 * to sort them as numbers you will need to pass a callback function.
 *
 */
console.log(movements.sort());

/*
 *
 *  The sort function with the callback function is little special, it works as
 *  if we are sorting the numbers in ascending order, the function would need to
 *  return a positive value if the first argument in the callback is larger than the
 *  second.
 *
 */

// Ascending
movements.sort((a, b) => {
    if (a > b) return 1;
    if (a < b) return -1;
});

// Descending
movements.sort((a, b) => {
    if (a > b) return -1;
    if (a < b) return 1;
});

/*
 *
 * The callback functions above can be significantly simplified with following
 * code
 *
 */

// Ascending
movements.sort((a, b) => a - b);

// Desending
movements.sort((a, b) => b - a);
```

With regards to the bakinst app, we implemented a sorting functionality of all
the movements related to an account holder.

```javascript
/*
 *
 * variable sorted is implemented as a state variable that identifies if the
 * movements should be sorted or not.
 *
 */
let sorted = false;

/*
 *
 *  Add an event listener to the sort button
 *
 */
btnSort.addEventListener('click', (e) => {
    e.preventDefault();

    /*
     *
     * Pass in the opposite of the current state of the variable sorted
     *
     */
    displayMovements(currentAccount.movements, !sorted);

    /*
     *
     *  Toogle the state variable sorted so that the next time you push it, it will
     * go back to its normal state (chronological order)
     *
     */
    sorted = !sorted;
});

/*
 *
 * In order to get this to work we also had to modify the displayMovements
 * function to take a second argument sort with the default value false
 *
 */

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

    /*
     *
     *  Now we perform forEach on the sorted movs array instead
     *
     */
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
```

## 11.162 MORE WAYS OF CREATING AND FILLING ARRAYS
