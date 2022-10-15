import * as model from './model.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultsView from './views/resultView'
import paginationView from './views/paginationView.js'
import bookmarksView from './views/bookmarksView.js'
import addRecipeView from './views/addRecipeView.js'
import MODAL_CLOSE_SEC from './config.js'

import 'core-js/stable' // Polyfill
import 'regenerator-runtime/runtime' // Polyfill

// Parcel code

if (module.hot) {
  module.hot.accept()
}


const controlRecipe = async function() {
  try {
    const id = window.location.hash.slice(1)

    if (!id) return

    recipeView.renderSpinner()

    // 0) Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // 1) Update bookmarks view
    bookmarksView.update(model.state.bookmarks)

    // 2) Loading recipe
    await model.loadRecipe(id)
    const { recipe } = model.state

    // 3) Rendering recipe
    recipeView.render(recipe)
  } catch (err) {
    recipeView.renderMessage()
  }
}

const controlSearchResults = async function() {
  try {
    resultsView.renderSpinner()

    // 1) Get search query
    const query = searchView.getQuery()

    if (!query) return

    // 2) Load search results
    await model.loadSearchResult(query)

    // 3) Render search results
    const results = model.getSearchResultsPage()
    resultsView.render(results)

    // 4) Render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    recipeView.renderMessage(err)
  }
}

const controlPagination = function(goToPage) {
  const results = model.getSearchResultsPage(goToPage)
  resultsView.render(results)
  paginationView.render(model.state.search)
}

const controlServings = function(newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings)

  // Update recipe view
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function() {
  // 1) Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
  else model.deleteBookmark(model.state.recipe.id)

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // 3) Render booksmarks view
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function() {
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function(newRecipe) {
  try {

    // Show loading spinner
    addRecipeView.renderSpinner()


    await model.uploadRecipe(newRecipe)
    // Render recipe
    recipeView.render(model.state.recipe)

    // Success
    addRecipeView.renderMessage()

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    // Close form window
    setTimeout (function() {
      addRecipeView.toggleWindow()

    }, MODAL_CLOSE_SEC * 1000)

    // Remove message in form window and reinstate html
    addRecipeView.render([1,1,1])

  } catch (err) {
    console.log(err)
    addRecipeView.renderError(err.message)
  }
}

function init() {
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipe)
  recipeView.addHandlerUpdateServings(controlServings)
  recipeView.addHandlerAddBookmark(controlAddBookmark)
  searchView.addHandlerSearch(controlSearchResults)
  paginationView.addHandlerClick(controlPagination)
  addRecipeView.addHandlerUpload(controlAddRecipe)
}

init()
