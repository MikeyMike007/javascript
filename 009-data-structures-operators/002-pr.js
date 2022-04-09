/*
 * PARSING EXERCISE
 */

const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30'

const getCode = (str) => str.slice(0, 3)

for (flight of flights.split('+')) {
    const [type, from, to, time] = flight.split(';')
    const p1 = type.startsWith('_Delayed') ? '🔴' : ' '
    const p2 = type.replaceAll('_', ' ')
    const p3 = getCode(from).toUpperCase()
    const p4 = getCode(to).toUpperCase()
    const p5 = time
    const output = (p1 + p2 + ' ' + p3 + ' ' + p4 + ' ' + p5).padStart(40)
    console.log(output)
}
