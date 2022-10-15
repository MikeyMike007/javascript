import {API_KEY, API_ENDPOINT} from './config.js'

export const idEndpoint = function(id) {
  return `${API_ENDPOINT}/recipes/${id}?key=${API_KEY}`
}

export const searchEndpoint = function(query) {
  return `${API_ENDPOINT}/recipes?search=${query}&key=${API_KEY}`
}


export const postRecipeEndpoint = function() {
  return `${API_ENDPOINT}/recipes?key=${API_KEY}`
}
