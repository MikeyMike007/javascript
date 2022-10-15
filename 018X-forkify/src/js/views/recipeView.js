import { View } from './View.js'
import icons from 'url: ../../../src/img/icons.svg'
import * as fraction from 'fractional'

class RecipeView extends View {
  _container = document.querySelector('.recipe')
  _errorMessage = 'This is a error message'
  _message = 'This is a message'
  _btnAddRecipe = document.querySelector('.nav__btn--add-recipe')
  _overlay = document.querySelector('.overlay')
  _window = document.querySelector('.add-recipe-window')
  _btnUpload = document.querySelector('.upload__btn')
  _btnCloseModal = document.querySelector('.btn--close-modal')

  constructor() {
    super()
    this._btnAddRecipe.addEventListener(
      'click',
      this.addEventListenersUploadRecipe.bind(this)
    )
    this._btnCloseModal.addEventListener(
      'click',
      this.eventCloseModal.bind(this)
    )
    this._overlay.addEventListener('click', this.eventCloseModal.bind(this))
  }

  eventCloseModal() {
    this._window.classList.add('hidden')
    this._overlay.classList.add('hidden')
  }

  addEventListenersUploadRecipe() {
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }

  addHandler(handler) {
    const events = ['load', 'hashchange']
    events.forEach((event) => {
      window.addEventListener(event, handler)
    })
  }

  addChangeServingsHandler(handler) {
    // Need to select container that exist even when no recipe loaded
    this._container.addEventListener('click', function(event) {
      const btn = event.target.closest('.btn--change-servings')
      if (!btn) return
      const servings = +btn.dataset.servings
      handler(servings)
    })
  }

  addBookmarkHandler(handler) {
    self = this
    this._container.addEventListener('click', function(event) {
      const btnBookmark = event.target.closest('.btn__bookmark')
      if (!btnBookmark) return

      handler(self._data)
    })
  }

  _generateMarkup = function() {
    return `
        <figure class="recipe__fig">
          <img src="${this._data.image_url}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${this._data.cooking_time
      }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${this._data.servings
      }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--change-servings" data-servings="${this._data.servings - 1
      }">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--change-servings" data-servings="${this._data.servings + 1
      }">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          ${this._data.isAdded ? this._isUserGeneratedMarkup() : ''}


                    <button class="btn--round btn__bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${this._data.isBookmarked ? '-fill' : ''
      }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this.renderIngredients()}
                   </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${this._data.publisher
      }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.source_url}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
`
  }

  _isUserGeneratedMarkup() {
    return `<div class="recipe__user-generated"> <svg> <use href="${icons}#icon-user"></use></svg></div>`
  }

  renderIngredients() {
    const ingredients = this._data.ingredients.map((ing) => {
      return `<li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity
          ? new fraction.Fraction(Math.round(ing.quantity)).toString()
          : ''
        }</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit ? ing.unit : ''
        }</span>
                    ${ing.description}
                  </div>
                </li>`
    })

    return ingredients.join('')
  }
}

export default new RecipeView()
