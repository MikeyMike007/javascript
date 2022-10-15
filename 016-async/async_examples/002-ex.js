'use strict'

let promise1 = new Promise(function(resolve, reject) {
  setTimeout(() => {
    resolve('You have waited 3 seconds to resolve')
  }, 3000)
})

let promise2 = new Promise(function(resolve, reject) {
  reject(new Error('Something went wrong'))
})

promise1.then(
  (result) => console.log(result),
  (error) => console.log(error.message)
)
promise2.then(
  function(result) {
    console.log(result)
  },
  function(error) {
    console.log(error.message)
  }
)


promise2.then(result => console.log(result)).catch(err => console.log(err.message))
