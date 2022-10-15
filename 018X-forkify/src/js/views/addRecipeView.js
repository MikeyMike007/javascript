import { View } from './View.js'
import icons from 'url: ../../../src/img/icons.svg'


class AddRecipeView extends View {

  _form = document.querySelector('.upload')
  



  addHandler(handler) {

    this._form.addEventListener('submit', function(event) {
      event.preventDefault()
      handler(this)
    })

  }


}

export default new AddRecipeView()
