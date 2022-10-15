'use strict'
// First settled promise wins the race. Doesnt matter if its resolve or reject
const getJSON = function(url, errorMsg = 'Something went') {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} : ${errorMsg}`)
    }
    return response.json()
  })
}

const timeout = function(s) {
  return new Promise(function(_, reject) {
    setTimeout(function() {
      reject(new Error('Request took to long'))
    }, s * 1000)
  })
}



//Promise.race
// We can include a timeout function so the request will not take to long.
Promise.race(
  // Promises will race against each other as in a real race
  [
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
    timeout(1),
  ]
)
  .then((res) => console.log(res[0]))
  .catch((err) => console.log(err))




//Promise.allSettled - returns the result of all promises even rejected ones.

Promise.allSettled([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('another success'),
]).then((res) => console.log(res))


Promise.all([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('another success'),
]).then((res) => console.log(res)).catch(err => console.log(err))

Promise.any([
  Promise.resolve('success'),
  Promise.reject('Error'),
  Promise.resolve('another success'),
]).then((res) => console.log(res)).catch(err => console.log(err))

// const get3Countries = async function(c1, c2, c3) {
//   try {
//     // Problem is that these dont load at the same time
//     // const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`)
//     // const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`)
//     // const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`)

//     // Run them in the same time
//     // You should run them in pararell if they dont depend on eachother
//     // Combinator functions
//     const data = await Promise.all([
//       getJSON(`https://restcountries.com/v2/name/${c1}`),
//       getJSON(`https://restcountries.com/v2/name/${c2}`),
//       getJSON(`https://restcountries.com/v2/name/${c3}`),
//     ])

//     console.log(data.map(el => el[0].capital))

//   } catch (err) {
//     console.error(err)
//   }
// }

// get3Countries('portugal', 'canada', 'tanzania')
// // const getPosition = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// const whereAmI = (async function () {
//     try {
//         const position = await getPosition()
//         const { latitude, longitude } = position.coords
//         const endpoint = `https://geocode.xyz/${latitude},${longitude}?geoit=json`
//         const response = await fetch(endpoint)
//         if (!response.ok) throw new Error('Problem getting location data')
//         const data = await response.json()
//         return `I am in ${data.city}, ${data.country}`
//     } catch (err) {
//         // In this type of function, we need to throw the error again
//         throw err
//     }
// })(
//     // console.log('1. Will get the location')

//     // const locationPhrase = whereAmI() // Error

//     // Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules (at script.js:37:24)
//     // const locationPhrase = await whereAmI()

//     // Need to do like this
//     // whereAmI()
//     //     .then((locationPhrase) => console.log(`2. ${locationPhrase}`))
//     //     .catch((err) => console.log(`2. ${err.message}`))
//     //     .finally(() => console.log('3. Finished getting location'))
//     // But we can also do like this which is more preferred

//     // Same as above

//     async function () {
//         try {
//             const place = await whereAmI()
//             console.log(`2. ${place}`)
//         } catch (err) {
//             console.log(`2. ${err.message}`)
//         } finally {
//             console.log('Finished getting location')
//         }
//     }
// )()
