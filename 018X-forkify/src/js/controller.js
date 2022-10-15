import recipeView from './views/recipeView.js'
import addRecipeView from './views/addRecipeView.js'
import bookmarksView from './views/bookmarksView.js'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'
import paginationView from './views/paginationView.js'

import * as model from './model'
import 'core-js/stable' // Polyfill
import 'regenerator-runtime/runtime' // Polyfill
// https://forkify-api.herokuapp.com/v2

/**
 * Will trigger on when somebody loads and recipe. This can happen through:
 * 1) Somebody logs into the website with a certain recipe endpoint (id)
 * 2) Somebody searches for an recipe and clicks on a recipe
 *
 * Technically triggers through 'load' or 'hashchange'
 */
const recipeHandler = async function() {
  try {
    // Retrieve hash on hashchange or load
    const id = window.location.hash.slice(1)
    if (!id) return

    // Await recipe fetch on id
    await model.loadRecipe(id)

    // Render the recipe in recipeview
    recipeView.render(model.state.recipe)
    console.log(model.state.recipe)

    // If the user has choosen to render recipe from resultsView, then restore search results and pagination
    const recipes = model.getPaginationSearchResults(
      model.state.search.currPage
    )
    if (!recipes) return
    resultView.render(recipes)

    // Restore pagination
    paginationView.render(model.state)

    // Restore bookmarks

    const bookmarks = model.getBookmarks()
    bookmarksView.render(bookmarks)
  } catch (err) {
    console.log(err)
    recipeView.renderError(err.message)
  }
}

/**
 * Handler that will be trigerred when user wants to change number of servings
 */
const changeServingsHandler = function(servings) {
  try {
    // Tell model change number of servings
    model.changeServings(servings)

    // Re-render the recipeview
    recipeView.render(model.state.recipe)
  } catch (err) {
    debugger
    recipeView.renderError(err.message)
  }
}

/**
 * Handler that will when user wants to search and submits form
 */
const searchHandler = async function(query) {
  try {
    // Search and load search results
    await model.loadRecipes(query)

    // Check if there are any results
    if (model.state.search.nrResults === 0) throw new Error('No results found')

    // Render first page in the resultview
    const initialSearchResults = model.getPaginationSearchResults(1)
    resultView.render(initialSearchResults)

    // Render pagination
    paginationView.render(model.state)
  } catch (err) {
    resultView.renderError(err.message)
  }
}

/**
 * Handler that will when user clicks on the pagination buttons
 */
const paginationHandler = function(page) {
  // Recieve page from UI and get page
  const searchResults = model.getPaginationSearchResults(page)

  // Re-render resultview
  resultView.render(searchResults)

  // Re-render paginationview
  paginationView.render(model.state)
}

/**
 * Handler that will be triggered when user clicks on the bookmark button
 */
const bookmarkHandler = function(recipe) {
  // Add bookmark / Delete bookmark if it already exists
  model.bookmarkToggle(recipe)

  const bookmarks = model.getBookmarks()
  console.log(bookmarks)
  bookmarksView.render(bookmarks)

  recipeView.render(model.state.recipe)
}

const addRecipeHandler = async function(form) {
  console.log(form)
  const recipe = {}
  const ingredients = []
  const recipeData = form
    .querySelectorAll('.upload__column')[0]
    .querySelectorAll('input')
  const ingredientData = form
    .querySelectorAll('.upload__column')[1]
    .querySelectorAll('input')

  recipeData.forEach((el) => {
    switch (el.name) {
      case 'title':
        recipe.title = el.value
      case 'sourceUrl':
        recipe.source_url = el.value
      case 'image':
        recipe.image_url = el.value
      case 'publisher':
        recipe.publisher = el.value
      case 'cookingTime':
        recipe.cooking_time = +el.value
      case 'servings':
        recipe.servings = +el.value
    }
  })

  ingredientData.forEach((el) => {
    if (!el.value) return

    items = el.value.split(',')
    console.log(items)

    const quantity = items[0] === '' ? null : +items[0]
    const unit = items[1] === '' ? '' : items[1]
    const description = items[2] === '' ? null : items[2]
    ingredients.push({ quantity, unit, description })
  })
  recipe.ingredients = ingredients

  try {
    const response = await model.postRecipe(recipe)
    const newRecipe = response.data.recipe
    model.addRecipe(newRecipe)
    const bookmarks = model.getBookmarks()
    console.log(bookmarks)
    bookmarksView.render(bookmarks)
  } catch (err) {
    console.log(err)
  }
}

// const sortHandler = function() {
//   if (!model.state.search.recipes) return

//   let recipes = []
//   console.log('hello')

//   model.state.search.recipes.forEach(async (el) => {
//     setTimeout(() => console.log('Fetching...'), 5000)
//     const recipe = await model.getRecipe(el.id)
//     recipes.push(recipe.data.recipe)
//   })

//   const sortedRecipes = recipes.sort((r1, r2) =>
//     r1.cooking_time < r2.cooking_time
//       ? 1
//       : r1.cooking_time > r2.cooking_time
//         ? -1
//         : 0
//   )

//   sortedRecipes.forEach((el) => console.log(el.cooking_time))

//   model.state.search.recipes = sortedRecipes

//   const firstSortedPage = model.getPaginationSearchResults(1)

//   resultView.render(firstSortedPage)
//   paginationView.render(model.state)
// }

const init = function() {
  recipeView.addHandler(recipeHandler)
  recipeView.addChangeServingsHandler(changeServingsHandler)
  searchView.addSearchHandler(searchHandler)
  paginationView.addHandler(paginationHandler)
  recipeView.addBookmarkHandler(bookmarkHandler)
  addRecipeView.addHandler(addRecipeHandler)
  // paginationView.addSortHandler(sortHandler)
}

init()
