import { idEndpoint, searchEndpoint, postRecipeEndpoint } from './helpers'

export const state = {
  recipe: {},
  search: {
    recipes: {},
    query: '',
    currPage: 1,
    recipesPerPage: 10,
    nrResults: 0,
    nrPages: 0,
  },
  bookmarks: [],
  addedRecipes: []
}

const timeout = function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Your request has been timed out'))
    }, 5000)
  })
}

export const getRecipe = async function(id) {
  try {
    const url = idEndpoint(id)
    const response = await fetch(url)
    if (!response.ok) throw new Error('API request unsuccesful')
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const loadRecipe = async function(id) {
  try {
    const data = await Promise.race([getRecipe(id), timeout()])

    const { recipe } = data.data
    const { ingredients } = recipe

    Object.assign(state.recipe, recipe)
    state.recipe.isBookmarked = isBookmarked(recipe) ? true : false
    state.recipe.isAdded = isAdded(recipe) ? true : false

    ingredients.forEach((ing) => {
      ing.quantity = !typeof ing.quantity === 'number' ? null : ing.quantity
      ing.unit = ing.unit == '' ? null : ing.unit
    })
  } catch (err) {
    throw err
  }
}

export const changeServings = function(newServings) {
  const currentServings = state.recipe.servings
  if (newServings <= 0) return

  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = ing.quantity * (newServings / currentServings)
  })

  state.recipe.servings = newServings
}

export const queryRecipes = async function(query) {
  try {
    const url = searchEndpoint(query)
    const response = await fetch(url)
    if (!response.ok) throw new Error('API request unsuccesful')
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const loadRecipes = async function(query) {
  try {
    const data = await Promise.race([queryRecipes(query), timeout()])
    const { recipes } = data.data

    recipes.forEach(recipe => {
      if (isAdded(recipe)) recipe.isAdded = true
      else recipe.isAdded = false
    })

    state.search.recipes = recipes
    console.log(state.search.recipes)
    state.search.query = query
    state.search.nrResults = recipes.length
    state.search.nrPages = Math.ceil(
      state.search.nrResults / state.search.recipesPerPage
    )
    state.search.currPage = 1
  } catch (err) {
    throw err
  }
}

export const getPaginationSearchResults = function(page) {
  if (page <= 0 || page > state.search.nrResults) return
  state.search.currPage = page
  startPageElements = (page - 1) * state.search.recipesPerPage
  endPageElements = page * state.search.recipesPerPage
  return state.search.recipes.slice(startPageElements, endPageElements)
}

export const bookmarkToggle = function(recipe) {
  if (state.bookmarks.some((el) => el.id == recipe.id)) {
    const indexRemove = state.bookmarks.findIndex((el) => el.id === recipe.id)
    state.bookmarks.splice(indexRemove, 1)
    recipe.isBookmarked = false
  } else {
    state.bookmarks.push({ ...recipe })
    recipe.isBookmarked = true
  }
}

export const isBookmarked = function(recipe) {
  return state.bookmarks.some((el) => el.id === recipe.id)
}

export const isAdded = function(recipe) {
  return state.addedRecipes.some((el) => el.id === recipe.id)
}


export const getBookmarks = function() {
  return state.bookmarks
}

export const postRecipe = async function(recipe) {
  try {
    const url = postRecipeEndpoint()
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe)
    })

    const response = await Promise.race([fetchPro, timeout()])

    const data = await response.json()
    return data
      } catch (err) {
    console.log(err.message)
    throw err
  }
}

export const addRecipe = function(recipe) {
  const newRecipe = {... recipe}
  newRecipe.isAdded = true
  state.addedRecipes.push(newRecipe)
  state.bookmarks.push(newRecipe)
}
