import View from './View.js'
import icons from 'url:../../img/icons.svg' // Parcel 2 syntax

class PaginationView extends View {

  _parentElement = document.querySelector('.pagination')
  _errorMessage = 'Pagination error'
  _message = 'Pagination message'

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline')
      if(!btn) return
      const goToPage = +btn.dataset.goto
      handler(goToPage)
    })
  }

  _generateMarkup() {
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    const currPage = this._data.page


   	// Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this.nextBtnMarkup(currPage + 1)
    }

    // Page 1, and there are no other pages
    if (currPage === 1 && numPages === 1) {
      return ""
    }

    // Last page
    if(currPage === numPages && numPages > 1) {
      return this.prevBtnMarkup(currPage - 1)
    }

    // Other page
    if (currPage !== 1 && currPage < numPages) {
      return [this.prevBtnMarkup(currPage - 1), this.nextBtnMarkup(currPage + 1)].join('')
    }

    return 0
  }



  	prevBtnMarkup(nr) { 
    return `
            <button data-goto="${nr}" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${nr}</span>
            </button>
    `}

    nextBtnMarkup(nr) {  
    return `
            <button data-goto="${nr} "class="btn--inline pagination__btn--next">
              <span>Page ${nr}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
            </button>
    `}

}

export default new PaginationView()
