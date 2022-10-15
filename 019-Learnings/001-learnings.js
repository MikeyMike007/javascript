const account = {
  owner: 'Firstname Surname',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interest: 1.2,
  pin: 111,
}

const anotherAccount = {
  owner: 'AnotherName anotherSurname',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interest: 1.2,
  pin: 222,
}

const accounts = [account, anotherAccount]

const movements = account.movements
let sort = true

// Make a copy of an array with slice
// Sort an array with sort
const movsAscending = sort ? movements.slice().sort((a, b) => a - b) : movements
const movsDecending = sort ? movements.slice().sort((a, b) => b - a) : movements
console.log(`movsAscending: ${movsAscending}`)
console.log(`movsDescending: ${movsDecending}`)

// Illustration forEach
movements.forEach((mov) =>
  mov > 0
    ? console.log(`Customer deposited ${mov}`)
    : console.log(`Customer withdraw ${mov}`)
)

// Illustration reduce
let balance = account.movements.reduce((acc, mov) => acc + mov, 0)
console.log(`Balance of account is: ${balance}`)

// Illustration filter
// Illustration reduce
const totalIncome = account.movements
  .filter((mov) => mov > 0)
  .reduce((acc, mov) => acc + mov, 0)

console.log(`Customer has total income of: ${totalIncome}`)

const totalExpenses = account.movements
  .filter((mov) => mov < 0)
  .reduce((acc, mov) => acc + mov, 0)

console.log(`Customer has total expenses of: ${totalExpenses}`)

// Illustration filter, map, reduce
const totalInterestEarned = movements
  .filter((mov) => mov > 0)
  .map((income) => (income * account.interest) / 100)
  .filter((interest) => interest >= 1) // Interest earned over 1 only payed out
  .reduce((acc, interest) => acc + interest, 0)

console.log(`Total interest earned: ${totalInterestEarned}`)

/*
 * Since a button is part of a form element, the page is
 * reloaded everytime when the button is clicked. We want toprevent this from
 * happening so we need to implement following method in a eventListeners callbacks function
 *
 * event.preventDefault()
 */

// Illustration: split, map and join

const initials = account.owner
  .toLowerCase()
  .split(' ')
  .map((name) => name[0])
  .join('')
console.log(`Initials: ${initials}`)

// Illustration ?

console.log(`${account?.pin}`)
console.log(`${account?.pin1}`)
console.log(`${account.pin1}`)

// Illustration flat, flatMap
let allMovements = accounts.map((acc) => acc.movements) // [account.movements, anotherAccount.movements]
allMovements = allMovements.flat() // [...account.movements, ...anotherAccount.movements]
console.log(allMovements)
// With chaining
const allMovements2 = accounts.map((acc) => acc.movements).flat()
console.log(allMovements2)
// Same with flatMap
const allMovements3 = accounts.flatMap((acc) => acc.movements)
console.log(allMovements3)

// Return an obhect from the reduce method
const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, curr) => {
      curr > 0 ? (sums.deposits += curr) : (sums.withdrawals += curr)
      return sums
    },
    { deposits: 0, withdrawals: 0 }
  )

console.log(sums)

const y = Array.from( {length: 7}, () => 1)
console.log(y)

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);
