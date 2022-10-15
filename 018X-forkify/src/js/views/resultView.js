import { View } from './View.js'
import icons from 'url: ../../../src/img/icons.svg'

class ResultView extends View {
  _container = document.querySelector('.results')
  _errorMessage = 'This is a error message'
  _message = 'This is a message'

  _generateMarkup() {
    const id = window.location.hash.slice(1)

    return this._data
      .map((result) => {
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
					
						${result.isAdded ? this._generateUserGeneratedImage() : ''}
                </div>
            </a>
          </li>`
      })
      .join('')
  }

  _generateUserGeneratedImage() {
 return `<div class="preview__user-generated">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>`

  }
}

export default new ResultView()
