'use strict'

class Workout {
    date = new Date()
    id = (Date.now() + '').slice(-10)
    clicks = 0

    constructor(coords, distance, duration) {
        this.coords = coords
        this.distance = distance // Km
        this.duration = duration // min
    }

    _setDescription() {
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ]

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
    click() {
        this.clicks++
    }
}

class Running extends Workout {
    type = 'running'
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration)
        this.cadence = cadence
        this.calcPace()
        this.calcSpeed()
        this._setDescription()
    }

    calcPace() {
        this.pace = this.duration / this.distance
        return this.pace
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}

class Cycling extends Workout {
    type = 'cycling'
    constructor(coords, distance, duration, elevation) {
        super(coords, distance, duration)
        this.elevation = elevation
        this.calcSpeed()
        this._setDescription()
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}

// APPLICATION
// ------------------------------------
const form = document.querySelector('.form')
const containerWorkouts = document.querySelector('.workouts')
const inputType = document.querySelector('.form__input--type')
const inputDistance = document.querySelector('.form__input--distance')
const inputDuration = document.querySelector('.form__input--duration')
const inputCadence = document.querySelector('.form__input--cadence')
const inputElevation = document.querySelector('.form__input--elevation')

class App {
    #map
    #mapEvent
    #zoomLevel = 19
    #workOuts = []

    constructor() {
        this._getPosition()

        // Get data from local storage
        this._getLocalStorage()
        // Inside event handler the this element points to form
        //  Fix this by binding it
        form.addEventListener('submit', this._newWorkout.bind(this))
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener(
            'click',
            this._moveToPopup.bind(this)
        )
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest('.workout')
        if (!workoutEl) return

        const workout = this.#workOuts.find(
            (work) => work.id === workoutEl.dataset.id
        )
        this.#map.setView(workout.coords, this.#zoomLevel, {
            animate: true,
            pan: {
                duration: 1,
            },
        })
        // Using the public interface
        workout.click()
    }

    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert('Could not get your position')
                }
            )
        }
    }

    _loadMap(position) {
        const { latitude } = position.coords
        const { longitude } = position.coords
        const coords = [latitude, longitude]

        // Will be placed in a div with ID 'map'
        this.#map = L.map('map').setView(coords, this.#zoomLevel)

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map)

        L.marker(coords)
            .addTo(this.#map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup()
        // EventListener according to API
        // Handling clicks on map
        this.#map.on('click', this._showForm.bind(this))

        // map is fully loaded, need to render saved markers
        this.#workOuts.forEach((work) => {
            this._renderWorkoutMarker(work)
        })
    }

    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _hideForm() {
        inputDistance.value =
            inputDuration.value =
            inputCadence.value =
            inputElevation.value =
                ''
        form.style.display = 'none'
        form.classList.add('hidden')
        setTimeout(() => (form.style.display = 'grid'), 1000)
    }

    _toggleElevationField() {
        // Inverse querySelector - Selects Parents instead of children
        inputElevation
            .closest('.form__row')
            .classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')
    }

    _newWorkout(event) {
        const { lat, lng } = this.#mapEvent.latlng
        let workout

        const validInputs = (...inputs) =>
            inputs.every((inp) => Number.isFinite(inp))

        const allPositive = (...inputs) => inputs.every((inp) => inp > 0)

        event.preventDefault()

        // Get data from form
        const type = inputType.value
        const distance = +inputDistance.value
        const duration = +inputDuration.value

        // If workout is running, create running object
        //
        if (type === 'running') {
            const cadence = +inputCadence.value

            // Check if data is valied
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Input have to be positive numbers')

            workout = new Running([lat, lng], distance, duration, cadence)
        }

        // If workout cycling, create cycling obhect
        if (type === 'cycling') {
            const elevation = +inputElevation.value

            // Check if data is valied
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert('Input have to be positive numbers')

            workout = new Cycling([lat, lng], distance, duration, elevation)
        }

        // Add new object to workout array
        this.#workOuts.push(workout)

        // Render workout on map as market
        this._renderWorkout(workout)

        // Render marker on map
        this._renderWorkoutMarker(workout)

        // Hide field and clear inputfields
        this._hideForm()

        // Save local storage to all workouts
        this._setLocalStorage()
    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 200,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(
                `${workout.type === 'running' ? '🏃' : '🚴'} ${
                    workout.description
                }`
            )
            .openPopup()
    }

    _renderWorkout(workout) {
        let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
                workout.type === 'running' ? '🏃' : '🚴'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `

        if (workout.type === 'running')
            html += `
              <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.pace.toFixed(1)}</span>
                <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                <span class="workout__icon">🦶🏼</span>
                <span class="workout__value">${workout.cadence}</span>
                <span class="workout__unit">spm</span>
              </div>
            </li>
        `

        if (workout.type === 'cycling')
            html += `
                <div class="workout__details">
                  <span class="workout__icon">⚡️</span>
                  <span class="workout__value">16</span>
                  <span class="workout__unit">km/h</span>
                </div>
                <div class="workout__details">
                  <span class="workout__icon">⛰</span>
                  <span class="workout__value">223</span>
                  <span class="workout__unit">m</span>
                </div>
              </li>
              `
        form.insertAdjacentHTML('afterend', html)
    }
    _setLocalStorage() {
        // Local Storage Browser - API - Only for small amounts of data
        // Note that you will trucate any references to functions when you stringify these
        localStorage.setItem('workouts', JSON.stringify(this.#workOuts))
    }

    _getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'))
        if (!data) return

        this.#workOuts = data
        this.#workOuts.forEach((work) => {
            // Cannot render marker here since map is not yet fully loaded
            // Note that you will trucate any references to functions when you stringify these
            this._renderWorkout(work)
        })
    }

    reset() {
        localStorage.removeItem('workouts')
        location.reload()
    }
}

const app = new App()
