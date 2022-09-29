'use strict'

// Arrow function can not be used as a function contstructor since it doesnt
// // have its own this keyword
// const Person = function (firstName, birthYear) {
//     console.log(this)
//     this.firstName = firstName
//     this.birthYear = birthYear
//     // Never do this
//     // Instead, use prototypal inheritance iunstead for efficiency.
//     this.calcAge = function () {
//         console.log(2037 - this.birthYear)
//     }
// }
//
// // 1. New {} is created
// // 2. Function is called, this = {}
// // 3. {} is linked to a prototype
// // 4. Function automatically return {}
//
// const jonas = new Person('Jonas', 1991)
// const matilda = new Person('Matilda', 2017)
// const jack = new Person('Jack', 2017)
// console.log(matilda, jack)
// console.log(jonas instanceof Person)
//
// /* Prototype
//  *
//  * All instances of Person will inherit from Person.prototype
//  */
//
// console.log(Person.prototype)
//
// Person.prototype.calcAge = function () {
//     console.log(2037 - this.birthYear)
// }
//
// /*
//  * Now, all instances of Person will have all properties of the prototype object.
//  */
//
// // Much more efficient than adding the function to each of the objects / instances
// jonas.calcAge()
// console.log(jonas.__proto__)
// console.log(jonas.__proto__ === Person.prototype) // true
// console.log(Person.prototype.isPrototypeOf(jonas)) // true
// console.log(Person.prototype.isPrototypeOf(matilda)) // true
// console.log(Person.prototype.isPrototypeOf(Person)) // false
//
// Person.prototype.species = 'Homo Sapiens'
// console.log(jonas)
// console.log(jonas.species)
//
// console.log(jonas.hasOwnProperty('firstName')) // true
// console.log(jonas.hasOwnProperty('species')) // false
//
// // ## Prototypal inheritance and built in objects
//
// console.log(jonas.__proto__) // Person.prototype
// console.log(jonas.__proto__.__proto__) // Object.prototype
// console.log(jonas.__proto__.__proto__.__proto__) // null
// console.dir(Person.prototype.constructor) // function(firstName, birthYear)
//
// const arr = [3, 6, 4, 5, 6, 9, 3]
// console.log(arr.__proto__)
// console.log(arr.__proto__ == Array.prototype)
// console.log(arr.__proto__.__proto__)
//
// Array.prototype.unique = function () {
//     return [...new Set(this)]
// }
//
// // Not recommended
// console.log(arr.unique()) // [3,6,4,5,9]
//
// const h1 = document.querySelector('h1')
// console.log((x) => x + 1)
//
// /* CODING CHALLEGE */
//
// const Car = function (make, speed) {
//     this.make = make
//     this.speed = speed
// }
//
// Car.prototype.accelrate = function () {
//     this.speed += 10
//     console.log(`${this.make} speed is ${this.speed}`)
// }
//
// Car.prototype.break = function () {
//     this.speed -= 10
//     console.log(`${this.make} speed is ${this.speed}`)
// }
//
// const bmw = new Car('Bmw', 50)
// bmw.accelrate()
// bmw.break()
//
// const volvo = new Car('Volvo', 70)
// volvo.accelrate()
// volvo.break()
//
// //-------------------------------------------------------------
//
// class PersonCl {
//     constructor(firstName, birthYear) {
//         this.firstName = firstName
//         this.birthYear = birthYear
//     }
//
//     // These will end up at the prototype level
//     calcAge() {
//         console.log(2037 - this.birthYear)/studenbt
//     }
//
//     get age() {
//         return 2037 - this.birthYear
//     }
// }
//
// const jessica = new PersonCl('Jessica', 1996)
// jessica.calcAge()
//
// console.log(jessica.__proto__ === PersonCl.prototype)
//
// // Same as below
// PersonCl.prototype.greet = function () {
//     console.log(`Hey ${this.firstName}`)
// }
//
// jessica.greet()
//
// // 1. Classes are NOT hoisted
// // 2. Class are firxt-class citizens
// // 3. Classes are executed in strict mode
//
// // Getters and setters
//
// const account = {
//     owner: 'jonas',
//     movements: [200, 530, 120, 300],
//     get latest() {
//         return this.movements.slice(-1).pop()
//     },
//
//     set latest(mov) {
//         this.movements.push(mov)
//     },
// }
//
// console.log(account.latest)
// account.latest = 50
// console.log(account.movements)
//
// class AnotherPerson {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName
//         this.birthYear = birthYear
//     }
//
//     get age() {
//         return 2037 - this.birthYear
//     }
//
//     // Setters are good for data validation
//     set fullName(name) {
//         if (name.includes(' ')) this._fullName = name
//         else alert(`${name} is not a full name`)
//     }
//     get fullName() {
//         return this._fullName
//     }
//
//     static helloThere() {
//         console.log('Hello there!!!')
//         console.log(this)
//     }
// }
//
// const jess = new AnotherPerson('Jessica Davis', 1996)
//
// // Static methods
// //
//
// /*
//  * From method is attached to the whole constructor
//  * and not the prototpye property of the constructor. Theefor, all arrays dfo
//  * not inherti the method. its not on their property. Its simpy attached to
//  * the constructor itself. Array.from just a simple function but is attached
//  * to the array constructor. So that developer knows its related to arrays
//  */
//
// // [1,2,3].from() // Not working
// const test = Array.from(document.querySelectorAll('h1')) // Working
//
// console.log(Number.parseFloat(12))
//
// AnotherPerson.hey = function () {
//     console.log('Hey there')
//     console.log(this) // class AnotherPerson {...}
// }
//
// AnotherPerson.hey()
// // jess.hey() Not working
//
// AnotherPerson.helloThere()
// // jess.helloThere() // Not working
//
// // Object.create
//
//
//

// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear)
//     },
//     init(firstName, birthYear) {
//         this.firstName = firstName
//         this.birthYear = birthYear
//     },
// }
//
// const steven = Object.create(PersonProto)
// steven.name = 'Steven'
// steven.birthYear = 2002
// steven.calcAge()
// console.log(steven)
// console.log(steven.__proto__)
//
// const sarah = Object.create(PersonProto)
// sarah.init('Sarah', 1979)
// sarah.calcAge()

// Codig challenge #3

// class Car {
//     constructor(make, speed) {
//         this.make = make
//         this.speed = speed
//     }
//
//     accelrate() {
//         this.speed += 10
//         console.log(`${this.make} is going at ${this.speed} Km/h`)
//     }
//
//     break() {
//         this.speed -= 10
//         console.log(`${this.make} is going at ${this.speed} Km/h`)
//     }
//
//     get speedUS() {
//         return this.speed / 1.6
//     }
//
//     set speedUS(speed) {
//         this.speed = speed * 1.6
//     }
// }
//
// const volvo = new Car('Volvo', 100)
//
// console.log(volvo.speedUS)
// volvo.speedUS = 80
// volvo.accelrate()
// console.log(volvo.speedUS)
// volvo.break()
//

// Inheritance Between "Classes": Constructor Functions

// const Person = function (firstName, birthYear) {
//     this.firstName = firstName
//     this.birthYear = birthYear
// }
//
// Person.prototype.calcAge = function () {
//     console.log(2037 - this.birthYear)
// }
//
// const Student = function (firstName, birthYear, course) {
//     Person.call(this, firstName, birthYear)
//
//     this.course = course
// }
// // Linking prototypes
// Object.setPrototypeOf(Student.prototype, Person.prototype)
// // Student.prototype = Object.create(Person.prototype)
// // Student.prototype.constructor = Student
//
// Student.prototype.introduce = function () {
//     console.log(`My name is ${this.firstName} and i study ${this.course}`)
// }
//
// const mike = new Student('Mike', 2020, 'Computer Science')
// mike.introduce()
// mike.calcAge() // 17
//
// console.log(mike.__proto__) // Person
// console.log(mike.__proto__.__proto__)
//
// Coding challenge III

// const Car = function (make, speed) {
//     this.make = make
//     this.speed = speed
// }
//
// const EV = function (make, speed, charge) {
//     Car.call(this, make, speed)
//     this.charge = charge
// }
//
// Car.prototype.brake = function () {
//     this.speed += -10
//     console.log(`${this.make} is braking, speed is now ${this.speed} Km/h`)
// }
//
// Car.prototype.status = function () {
//     console.log(`${this.make} is going full speed ahead at ${this.speed} Km/h`)
// }
//
// Car.prototype.accelrate = function () {
//     this.speed += 20
//     console.log(`${this.make} is accelrating, going at ${this.speed} Km/h`)
// }
//
// EV.prototype = Object.create(Car.prototype)
//
// const volvo = new Car('Volvo', 50)
// const tesla = new EV('Tesla', 60, 100)
// volvo.status()
// volvo.accelrate()
// volvo.brake()
//
// tesla.status()
// tesla.accelrate()
// tesla.brake()
//
// EV.prototype.status = function () {
//     console.log(
//         `${this.make} is going full speed ahead at ${this.speed} Km/h with charge ${this.charge}`
//     )
// }
//
// EV.prototype.accelrate = function () {
//     this.charge += -10
//     console.log(
//         `${this.make} is accelrating, going at ${this.speed} Km/h with charge ${this.charge}`
//     )
// }
// tesla.status()
// tesla.accelrate()
//

// Inhertiance
//

// class PersonCl {
//     constructor(fullName, birthYear) {
//         this.fullName = fullName
//         this.birthYear = birthYear
//     }
//     calcAge() {
//         console.log(2037 - this.birthYear)
//     }
//
//     get age() {
//         return 2037 - this.birthYear
//     }
//
//     // Setters are good for data validation
//     set fullName(name) {
//         if (name.includes(' ')) this._fullName = name
//         else alert(`${name} is not a full name`)
//     }
//     get fullName() {
//         return this._fullName
//     }
// }
//
// class StudentCl extends PersonCl {
//     constructor(fullName, birthYear, course) {
//         super(fullName, birthYear)
//         this.course = course
//     }
//
//     introduce() {
//         console.log(`My name is ${this.fullName} and i study ${this.course}`)
//     }
//
//     // Override calcAge function of parent
//     calcAge() {
//         console.log(
//             `I am ${
//                 2037 - this.birthYear
//             } years old, but as a student i feel more like ${
//                 2037 - this.birthYear + 10
//             }`
//         )
//     }
// }
//
// const martha = new StudentCl('Martha Jonas', 2012, 'Computer science')
// martha.introduce()
// console.log(martha.age)
// console.log(martha.fullName)
// obhect.create
//

// const PersonProto = {
//     calcAge() {
//         console.log(2037 - this.birthYear)
//     },
//     init(firstName, birthYear) {
//         this.firstName = firstName
//         this.birthYear = birthYear
//     },
// }
//
// // const steven = Object.create(PersonProto)
// const StudentProto = Object.create(PersonProto)
// StudentProto.init = function (firstName, birthYear, course) {
//     PersonProto.init.call(this, firstName, birthYear)
//     this.course = course
// }
//
// StudentProto.introduce = function () {
//     console.log(`My name is ${this.firstName} and i study ${this.course}`)
// }
//
// const jay = Object.create(StudentProto)
// jay.init('Jay', 2010, 'Computer Science')
// jay.introduce()
// jay.calcAge()

// Bank
//
// Public fields
// Private fields
// Public methods
// Private methods
// Private methods
// Also same as abovbe just static

class Account {
    // 1. Public fields (Instances) - Not added to prototypes - Just instances
    locale = navigator.language

    // 2. Private fields (Available only on the instances)
    #movements = []
    #pin

    constructor(owner, currency, pin) {
        this.owner = owner
        this.currency = currency
        this.#pin = pin

        console.log(`Thanks for opening an account, ${this.owner}`)
    }

    // 3. Public methods

    getMovements() {
        return this.#movements
    }

    requestLoan(val) {
        if (this.#approveLoan(val)) {
            this.deposit(val)
            console.log('Loan approved and deposited')
        } else {
            console.log('Loan not approved')
        }
        return this
    }
    deposit(val) {
        this.#movements.push(val)
        return this
    }

    withdraw(val) {
        this.deposit(-val)
        return this
    }

    // 4. Private methods
    #approveLoan(val) {
        return true
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111)

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(2500).withdraw(4000)
console.log(acc1.getMovements()) // [300, 500, -35, 2500, -4000]
