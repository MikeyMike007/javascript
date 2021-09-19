# 010 - A CLOSER LOOK AT FUNCTIONS

## 10.127 DEFAULT PARAMETERS

## 10.128 HOW PASSING ARGUMENTS WORKS: VALUE VS REFERENCE

## 10.129 FIRST CLASS AND HIGH ORDER FUNCTIONS

## 10.130 FUNCTIONS ACCEPTING CALLBACK FUNCTIONS

## 10.131 FUNCTIONS RETURNING FUNCTIONS

## 10.132 THE CALL AND APPLY METHODS

## 10.133 THE BIND METHOD

## 10.134 CODING CHALLENGE #1

## 10.135 IMMEDIATELLY INVOKED FUNCTION EXPRESSIONS (IIFE)

## 10.136, 10.137 Closures

The function `booker()` in the code example below is able to increment the
variable `passengerCount`, first to 1, then to 2 and finally to 3. A question
is how come is this possible? Why is the `booker()` function able to update
the `passengerCount` variable that is defined in a secure function that
actually has already finished its execution. In other words, its execution
context is no longer on the stack. What makes this possible is a
closure.

A closure makes a function remember all the variables that existed at the
function birthplace. In this case, the function `secureBooking` is the
birthplace of the function that has returned. So the returned function remembers
everything at its birthplace by the time it was created. This cannot simply
be explained with the scope chain alone.

The execution context of the function `secureBooking` is no longer on the call
stack. This function has finished execution long time ago.

`booker()` is a function that is now located in the global scope. The first thing that
is going top happen when we run the `booker()` function is that a new execution
context is going to be created and put on top of the call stack.

The variable environment of this context is empty simply there are no variables
declared in this function. Then what about the scope chain? Since `booker()` is in
the global context, lounge b its has simply a child scope of the global scope.

How will the `booker()` function access the `passengerCount` variable, its nowhere to
be found in the scope chain? So this is where we unweil the secret of the
closures. The secret is basically: Any function always has access to the
variable environment of the execution context in which the function was
created. The `booker` function was born in the execution context of `secureBooking`
which was popped of the stack previously. So therefore, the `booker` function
will get access to this variable environment which contains the `passengerCount`
variable and this is how the function is able to read and manipulate the
`passengerCount` variable.

A function always has access to the variable environment of the execution
context in which is was created, even after that execution context is gone.
The closure is basically this variable environment attached to the function
exactly as it was at the time and place as when the function was created.

Thanks to the closure, a function does not loose connection to variables that
existed at the functions birthplace.

When you run the booker function, javascript will basically at first look for
variables that the function is calling in the closure first, even before the
own scope chain. This means that the variables in the closure have priority
even before the variables in its own scope chain.

Definitions of closures:

-   A closure is the closed-over variable environment of the execution context
    in which a function was created, even after that execution context is gone.

-   A closure gives a function access to all the variables of its parent
    function, even after that parent function has returned. The function
    keeps a reference to its outer scope, which preserves the scope chain
    through time.

-   A closure makes sure that a function doesn't loose connection to variables
    that existed at the function birth place.

-   A closure is like a backpack that a function carries around whenever it
    goes. This backpack has all the variables that were present in the
    environment where the function was created.

```javascript
const secureBooking = function () {
    // Remember scope rules, this cannot be accesses from the outside
    let passengerCount = 0;

    return function () {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();
booker(); // 1 passengers
booker(); // 2 passengers
booker(); // 3 passengers
```

As a proof, you can see which variables that are in the closure by looking at
the properties of the function itself. We can do this with the code
`console.dir(booker);`

These examples will show that you don't need to return a function from a
function in order to create a closure.

### Example 1

```javascript
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};

g();
f(); // 46
```

This proves that the variable `f` (a function) does close over
variables of the execution context in which it was defined. This is true even
when the variable itself is not defined inside of this variable environment.
The `f` variable was defined outside in the global scope i.e. it was created
here but then as we assigned it a function inside the `g()` function. As it is
assigned inside the `g()` function it closes over the variable environment of the
`g()` function and that includes the variable `a`. With other words, the `a`
variable is inside the backpack of the `f` function.

### Example 2

```javascript
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
f(); // 46

/* Please note that the function h() below will reassign the variable f */

h();
f(); // 1554
```

The code above illustrates a change of closures as the function f() becomes
reassigned.

### Example 3

```javascript
const boardPassengers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function () {
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers`);
    }, wait * 1000);
    console.log(`Will start boarding in ${wait} seconds`);
};

/*
const perGroup = 1000; Even if you remove the comment here the callback
function will not access this variable as the variables in the closure has
priority
*/
boardPassengers(100, 3);
```

in the output, we get following:

```md
Will start boarding in 1000 seconds

... (after 3 seconds)

We are now boarding all 100 passengers
There are 3 groups, each with 33.33 passengers
```

Keep in mind that the callback function in the example above was executed
completely independently from the `boardPassengers()` function. But still, the
callback function was able to use all the variables that were in the variable
environment in which it was created (The variable `n` and `perGroup`).

This example is a clear sign of a closure being created. So the only way in
which this callback function can have access to the variables in the
`boardPassenger()` function that has long finished execution is if it created a
closure.

## CODING CHALLENGE #2
