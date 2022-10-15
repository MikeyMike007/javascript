console.log('Start fetching users')
const data = await fetch('https://jsonplaceholder.typicode.com/posts')
console.log('Data has been loaded')

const shippingCost = 10
export const cart = []

export const addToCart = function(product, quantity) {
  cart.push({product, quantity})
}

