/*
  * STRING MAIPULATION
  */

const airline = 'TAP Air Portugal'
const passenger = 'jOnAS'
const loginEmail = '  Hello@Jonas.Io\n'
const priceGB = '288,97£'
const announcement =
    'All passengers come to boarding door 23. Boarding door 23!'
const plane = 'Airbus A320neo'

console.log(airline.indexOf('r')) // First index of r = 6
console.log(airline.lastIndexOf('r')) // Last index of r = 10
console.log(airline.indexOf('Portugal')) // Index of when Portugal is starting
console.log(airline.slice(4)) // Air Portugal
console.log(airline.slice(4, 7)) // Air
console.log(airline.slice(0, airline.indexOf(' '))) // First word: TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)) // Last word: Portugal
console.log(airline.slice(-2)) // al
console.log(airline.slice(1, -1)) // Deletes first and last character
console.log(airline.toUpperCase()) // TAP AIR PORTUGAL
console.log(airline.toLowerCase()) // tap air portugal

const checkMiddleSeat = (seat) => {
    const s = seat.slice(-1)
    if (s === 'B' || s === 'E') {
        console.log('You got middle seat')
    }
}

checkMiddleSeat('11B')
checkMiddleSeat('23C')
checkMiddleSeat('3E')

console.log(passenger[0].toUpperCase() + passenger.slice(1).toLowerCase()) // Jonas
console.log(loginEmail.toLowerCase().trim()) // hello@jonas.io
console.log(`Dollar: ${priceGB.replace('£', '$').replace(',', '.')}`) // 288.97$
console.log(announcement.replace('door', 'gate'))
console.log(announcement.replace(/door/g, 'gate')) // Can be done with regex

console.log(plane.includes('A320')) // true
console.log(plane.includes('neo')) // true
console.log(plane.includes('Airbus')) // true
console.log(plane.includes('Boeing')) // false

if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
    console.log('You are flying Airbus neo')
}

const checkBaggage = (baggage) => {
    if (
        baggage.toLowerCase().includes('knife') ||
        baggage.toLowerCase().includes('gun')
    ) {
        console.log('You are not welcome')
    } else {
        console.log('You are welcome')
    }
}

checkBaggage('Guns and popcorn')
checkBaggage('clothes')
checkBaggage('Lots of Knifes and food')
