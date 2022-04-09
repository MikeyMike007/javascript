'use strict'

/*
 * PARSING EXERCISE
 */
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30'

const getCode = (str) => str.slice(0, 3).toUpperCase()

for (const flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';')

    const p1Sign = `${type.startsWith('_Delayed') ? '🔴' : '  '}`
    const p2 = `${type.replaceAll('_', ' ')}`
    const p3From = getCode(from)
    const p4To = getCode(to)
    const p5Time = `${time.replace(':', 'h')}`
    const output = `${p1Sign}${p2} ${p3From} ${p4To} (${p5Time})`.padStart(36)
    console.log(output)
}
