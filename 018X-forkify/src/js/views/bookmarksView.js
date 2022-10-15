import { View } from './View.js'
import icons from 'url: ../../../src/img/icons.svg'

class BookmarksView extends View {
  _container = document.querySelector('.bookmarks__list')

  _generateMarkup() {
    const id = window.location.hash.slice(1)

    return this._data
      .map((result) => {
        console.log(`Bookmark link: ${result.id}`)
        return ` 
          <li class="preview">
            <a class="preview__link ${id === result.id ? 'preview__link--active' : ''
          }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image_url}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>

                ${result.isAdded ? this._generateUserCreatedImage() : ''}


              </div>
            </a>
          </li>
`
      })
      .join('')
  }

  _generateUserCreatedImage() {
    return `<div class="preview__user-generated">
              <svg>
                <use href="${icons}#icon-user"></use>
              </svg>
            </div>`
  }
}

export default new BookmarksView()

// ${result.isAdded ? this._generateMarkup() : ''}
