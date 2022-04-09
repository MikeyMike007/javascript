const jonas = {
    firstName: 'jonas',
    year: 1991,
    ageInfo: function () {
        console.log(`${this.firstName} is born in year: ${this.year}`)
        // console.log(this) // Jonas {}

        const isMillenial = function () {
            // this.year is undefined for this function
            // console.log(this) // Global Object
            return this.year >= 1990 ? true : false
        }
        const millenial = isMillenial()
            ? `${this.firstName} is a millenial`
            : `${this.firstName} is not a millenial`

        console.log(millenial)
    },
    ageInfoArrow: function () {
        console.log(`${this.firstName} is born in year: ${this.year}`)
        // console.log(this) // Jonas {}

        const isMillenial = () => {
            // console.log(this) // jonas {}
            return this.year >= 1990 ? true : false
        }
        const millenial = isMillenial()
            ? `${this.firstName} is a millenial`
            : `${this.firstName} is not a millenial`

        console.log(millenial)
    },

    ageInfoTrick: function () {
        console.log(`${this.firstName} is born in year: ${this.year}`)
        // console.log(this) // Jonas {}
        self = this
        const isMillenial = function () {
            // this.year is undefined for this function
            // console.log(this) // Global Window object
            return self.year >= 1990 ? true : false
        }
        const millenial = isMillenial()
            ? `${this.firstName} is a millenial`
            : `${this.firstName} is not a millenial`

        console.log(millenial)
    },

    ageInfoNotWorking: () => {
        console.log(`${this.firstName} is born in year: ${this.year}`)
        // console.log(this) // Jonas {}
        self = this
        const isMillenial = function () {
            // this.year is undefined for this function
            // console.log(this) // Global Window object
            return self.year >= 1990 ? true : false
        }
        const millenial = isMillenial()
            ? `${this.firstName} is a millenial`
            : `${this.firstName} is not a millenial`

        console.log(millenial)
    },
}

jonas.ageInfo()
/*
 * OUTPUT:
 * Jonas is born in year: 1991
 * jonas is not a millenial // WHY? ITS BECAUSE this.year returns undefined? this points to global object.
 * // this is pointing to global window pointer.
 */
jonas.ageInfoArrow()
/*
 * OUTPUT:
 * Jonas is born in year: 1991
 * jonas is a millenial // With the arrow function this.year returns 1991.
 * // Arrows function inherits its parent this pointer
 */

jonas.ageInfoTrick()
/*
 * OUTPUT:
 * Jonas is born in year: 1991
 * jonas is a millenial // self = this makes the trick
 */

jonas.ageInfoNotWorking()
/*
 * OUTPUT:
 * undefined is born in year: Undefined
 * undefined is not a millenial
 */

const matilda = {
    firstName: 'Matilda',
    year: 2017,
}

matilda.ageInfoArrow = jonas.ageInfoArrow
matilda.ageInfoArrow()
/*
 * OUTPUT:
 * Matilda is born in year: 1991
 * Matilda is a millenial
 */ // this is now pointing towards matilda

/*
 * Arguments
 */

const addExpression = function (a, b) {
    console.log(arguments)
    return a + b
}

const addExpressionsArrow = () => {
    console.log(arguments) // ERROR: ARROW FUNCTION DOESNT HAVE THIS PROPERTY
    return a + b
}

addExpression(2, 5)

/*
 * OUTPUT:
 * [Arguments]: {'0': 2, '1': 5}
 */

addExpression(2, 5, 1)
/*
 * OUTPUT:
 * [Arguments]: {'0': 2, '1': 5, '2': 1}
 */

// addExpressionsArrow(2, 5) // ERROR
// addExpressionArrow(1, 2, 3, 4, 5) //ERROR

const jessica = {
    firstName: 'Jessica',
    lastName: 'Williams',
    age: 27,
    family: ['Alice', 'Bob'],
}

const jessicaCopy = Object.assign({}, jessica)
jessicaCopy.lastName = 'Davis'
jessicaCopy.family.push('John')

jessica.family.push('Mary')

console.log(`jessica's lastname: ${jessica.lastName}`)
console.log(`jessicaCopy's lastname: ${jessicaCopy.lastName}`)

console.log(`jessica's family: ${jessica.family}`)
console.log(`jessicaCopy's family: ${jessicaCopy.family}`)
/*
 * OUTPUT:
 *
 * jessica's lastname: Williams
 * jessicaCopy's lastname: Davis
 * jessica's family: Alice,Bob,John,Mary
 * jessicaCopy's family: Alice,Bob,John,Mary
 *
 *
 *  CONCLUSION:
 *
 *  WHY is lastNamed different and family the same?
 *
 * Copy objects with `const copyObj = Object.assign({}, originalObj);`.
 * Please note that this is a shallow copy. So if you have defined an object
 * inside an object. The copy of the inside object will not follow.
 */
