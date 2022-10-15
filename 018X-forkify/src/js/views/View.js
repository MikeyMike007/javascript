import icons from 'url: ../../../src/img/icons.svg'

export class View {
  _data


  render(data, render = true) {
    this._data = data
    const markup = this._generateMarkup()

    if (!render) return markup

    this._renderSpinner()
    this._clearAndRenderContainer(markup)
  }

  _clearContainer() {
    this._container.innerHTML = ''
  }

  _clearAndRenderContainer(markup) {
    this._clearContainer()
    this._container.insertAdjacentHTML('beforeend', markup)
  }

  _renderSpinner() {
    const markup = `<div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
`
    this._clearAndRenderContainer(markup)
  }

  renderError(errorMessage = this._errorMessage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMessage}</p>
          </div>`
    this._clearAndRenderContainer(markup)
  }
}
