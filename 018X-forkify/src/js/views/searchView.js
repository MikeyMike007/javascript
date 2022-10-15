import { View } from './View.js'

class SearchView extends View {
  _container = document.querySelector('.search')
  _errorMessage = 'This is a error message'
  _message = 'This is a message'

  addSearchHandler(handler) {
    this._container.addEventListener('submit', function(event) {
      event.preventDefault()
      const btn = event.target.querySelector('.search__btn')
      const searchField = event.target.querySelector('.search__field')
      if (!btn || !searchField) return
      const query = searchField.value
      handler(query)
    })
  }
}

export default new SearchView()
