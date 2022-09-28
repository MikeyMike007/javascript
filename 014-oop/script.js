'use strict'

// Arrow function can not be used as a function contstructor since it doesnt
// have its own this keyword
const Person = function (firstName, birthYear) {
    console.log(this)
    this.firstName = firstName
    this.birthYear = birthYear
    // Never do this
    // Instead, use prototypal inheritance iunstead for efficiency.
    this.calcAge = function () {
        console.log(2037 - this.birthYear)
    }
}

// 1. New {} is created
// 2. Function is called, this = {}
// 3. {} is linked to a prototype
// 4. Function automatically return {}

const jonas = new Person('Jonas', 1991)
const matilda = new Person('Matilda', 2017)
const jack = new Person('Jack', 2017)
console.log(matilda, jack)
console.log(jonas instanceof Person)

/* Prototype
 *
 * All instances of Person will inherit from Person.prototype
 */

console.log(Person.prototype)

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear)
}

/*
 * Now, all instances of Person will have all properties of the prototype object.
 */

// Much more efficient than adding the function to each of the objects / instances
jonas.calcAge()
console.log(jonas.__proto__)
console.log(jonas.__proto__ === Person.prototype) // true
console.log(Person.prototype.isPrototypeOf(jonas)) // true
console.log(Person.prototype.isPrototypeOf(matilda)) // true
console.log(Person.prototype.isPrototypeOf(Person)) // false

Person.prototype.species = 'Homo Sapiens'
console.log(jonas)
console.log(jonas.species)

console.log(jonas.hasOwnProperty('firstName')) // true
console.log(jonas.hasOwnProperty('species')) // false

// ## Prototypal inheritance and built in objects

console.log(jonas.__proto__) // Person.prototype
console.log(jonas.__proto__.__proto__) // Object.prototype
console.log(jonas.__proto__.__proto__.__proto__) // null
console.dir(Person.prototype.constructor) // function(firstName, birthYear)

const arr = [3, 6, 4, 5, 6, 9, 3]
console.log(arr.__proto__)
console.log(arr.__proto__ == Array.prototype)
console.log(arr.__proto__.__proto__)

Array.prototype.unique = function () {
    return [...new Set(this)]
}

// Not recommended
console.log(arr.unique()) // [3,6,4,5,9]

const h1 = document.querySelector('h1')
console.log((x) => x + 1)
