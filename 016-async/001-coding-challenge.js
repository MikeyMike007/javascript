'use strict'

const btn = document.querySelector('.btn-country')
const countriesContainer = document.querySelector('.countries')

function whereAmI(position) {
    const { lat, lng } = position
    const endpoint = `https://geocode.xyz/${lat},${lng}?geoit=json`
    return fetch(endpoint).then((response) => {
        if (!response.ok)
            throw new Error(`Something went wrong: ${response.status} - Probably something with Api`)
        return response.json()
    })
}

function renderCountry(data, className = '') {
    const html = `
           <article class="country ${className}">
             <img class="country__img" src="${data.flag}" />
             <div class="country__data">
               <h3 class="country__name">${data.name}</h3>
               <h4 class="country__region">${data.region}</h4>
               <p class="country__row"><span>👫</span>${(
                   +data.population / 1000000
               ).toFixed(1)}</p>
               <p class="country__row"><span>🗣️</span>${
                   data.languages[0].name
               }</p>
               <p class="country__row"><span>💰</span>${
                   data.currencies[0].name
               }</p>
             </div>
           </article>
           `

    countriesContainer.insertAdjacentHTML('beforeend', html)
    countriesContainer.style.opacity = 1
}

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg)
    countriesContainer.style.opacity = 1
}

const getJSON = function (url, errorMsg = 'Something went') {
    return fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error(`Error: ${response.status} : ${errorMsg}`)
        }
        return response.json()
    })
}

function getCountryData(country) {
    getJSON(`https://restcountries.com/v2/name/${country}`)
        .then((data) => {
            renderCountry(data[0])
            const neighbour = data[0].borders?.[0]
            if (!neighbour) throw new Error('No neighbour found')

            return getJSON(
                `https://restcountries.com/v2/alpha/${neighbour}`,
                `No country of name ${neighbour} found`
            )
        })
        .then((data) => renderCountry(data, 'neighbour'))
        .catch((err) => renderError(`Error: ${err.message}`))
        .finally(() => (countriesContainer.style.opacity = 1))
}

const pos = { lat: '52.508', lng: '13.381' }
whereAmI(pos)
    .then((data) => {
        console.log(`You are in ${data.city}, ${data.country}`)
        getCountryData(data.country)
    })
    .catch((err) => console.log(`Error: ${err.message}`))
