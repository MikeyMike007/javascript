import { View } from './View.js'
import icons from 'url: ../../../src/img/icons.svg'

class PaginationView extends View {
  _container = document.querySelector('.pagination')

  addHandler(handler) {
    this._container.addEventListener('click', function(event) {
      const btn = event.target.closest('.btn--inline')
      if (!btn || btn.classList.contains('.pagination__btn--sort')) return

      handler(+btn.dataset.goToPage)
    })
  }


  addSortHandler(handler) {
    this._container.addEventListener('click', function(event) {
      const btn = event.target.closest('.pagination__btn--sort')
      if (!btn) return

      handler()
    })
  }


  _generateMarkup() {
    const currentPage = this._data.search.currPage
    const numberPages = this._data.search.nrPages

    if (currentPage === 1 && numberPages === 1) {
      return this.btnSort()
    }

    if (currentPage === 1 && numberPages >= 1) {
      return [this.generateBtnNext(currentPage + 1), this.btnSort()].join('')
    }

    if (currentPage === numberPages) {
      return [this.generateBtnPrev(currentPage - 1), this.btnSort()].join('')
    }

    if (currentPage >= 1 && currentPage < numberPages) {
      return [
        this.generateBtnPrev(currentPage - 1),
        this.generateBtnNext(currentPage + 1),
        this.btnSort()
      ].join('')
    }
  }

  generateBtnPrev(pageNumber) {
    return `<button class="btn--inline pagination__btn--prev" data-go-to-page="${this._data.search.currPage - 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${pageNumber}</span>
          </button>`
  }

  generateBtnNext(pageNumber) {
    return `<button class="btn--inline pagination__btn--next" data-go-to-page="${this._data.search.currPage + 1}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
            <span>Page ${pageNumber}</span>
          </button>`
  }


  btnSort() {
    return `<button class="btn--inline pagination__btn--sort">
            <svg class="search__icon">
              <use href="${icons}#icon-smile"></use>
            </svg>
            <span>Sort</span>
          </button>`
  }
}

export default new PaginationView()
