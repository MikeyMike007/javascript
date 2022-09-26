'use strict'

///////////////////////////////////////
// Modal window
//

// 1. Selection Elements in the DOM
// -----------------------------------
//
// // Root node of the document
// console.log(document.documentElement)
//
// // Returns head element
// console.log(document.head)
//
// // Returns the body element
// console.log(document.body)
//
// // Selects the .header elemen
// const header = document.querySelector('.header')
//
// // Selects all .section elements
// const allSections = document.querySelectorAll('section')
// console.log(allSections)
//
// // Get element with id
// console.log(document.getElementById('section--1'))
//
// // Select all elements with tagname button
// const allButtons = document.getElementsByTagName('button')
// console.log(allButtons)
//
// // Select all elements with a certain classname
// console.log(document.getElementsByClassName('btn'))
//
// // 2. Creating and inserting elements
// // -----------------------------------
// // Use .insertAdjacentHTML
//
// const message = document.createElement('div')
// message.classList.add('cookie-message')
// // message.textContent =
// //     'We used coockies for improved functionality and analytics'
//
// message.innerHTML =
//     'We use coockies for improved functionality and analytics. <button class ="btn btn--close-cookie">Got it! </button>'
//
// // Can only use one of these
// // header.prepend(message)
// header.append(message)
//
// document.querySelector('.btn--close-cookie').addEventListener('click', () => {
//     message.remove()
//     // message.parentElement.removeChild(message)
// })
//
// // If you really want to insert this in many other places. Use following.
// // i.e. You need to copy the element.
// // header.append(message.cloneNode())
// //
// // Insert before / After as a sibling
// // header.before(message)
// // header.after(message)
// //
// // 3. Styles, attributes and classes
// // ------------------------------------
// //
// // 3.1 Styles
// // ----------------------------
// message.style.backgroundColor = '#37383d'
// message.style.width = '120%'
//
// // Cannot get style unless inline
// // Need to use getComputerStyle
// console.log(getComputedStyle(message).color)
// console.log(getComputedStyle(message).height)
//
// message.style.height =
//     Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px'
//
// document.documentElement.style.setProperty('--color-primary', 'orangered')
//
// // 3.2 Attributes
// // -----------------------------------
// const logo = document.querySelector('.nav__logo')
// // Standard attributes - workds
// console.log(logo.alt)
// console.log(logo.src)
// console.log(logo.className)
// // You can also set it
// logo.alt = 'Beautiful minimalist logo'
// console.log(logo.alt)
// // Nonstandard attributes - Doesnt work
// console.log(logo.designer)
// // Need to use getAttribute()
// console.log(logo.getAttribute('designer'))
// logo.setAttribute('company', 'Bankist')
// console.log(logo.getAttribute('company'))
//
// console.log(logo.src) // http://127.0.0.1:8080/img/logo.png
// console.log(logo.getAttribute('src')) // img/logo.png
//
// const link = document.querySelector('.twitter-link')
// console.log(link.href)
// console.log(link.getAttribute('href'))
//
// // Data attributes
// // Common to work with datasets when you need to store data in the HTML / UI
// // You need to strore it like this in the tag:
// //
// // <img
// //     src="img/logo.png"
// //     alt="Bankist logo"
// //     class="nav__logo"
// //     id="logo"
// //     data-version-number="3.0" // non camelcase i.e. version-number
// console.log(logo.dataset.versionNumber) // camelCase i.e. versionNumber
//
// // Classes
// logo.classList.add('c')
// logo.classList.toggle('c')
// logo.classList.contains('c')
// logo.classList.remove('c')
//
// // Do not use Will override all the rest
// logo.className = 'Jonas'

//-------------------------------------------------------------

// Smooth scrolling
// ----------------------
// const btnScrollTo = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')
//
// btnScrollTo.addEventListener('click', () => {
//     // const s1coords = section1.getBoundingClientRect()
//     // console.log(s1coords)
//     // // e is the selected button
//     // console.log(e.target.getBoundingClientRect())
//     // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset)
//     // console.log(
//     //     'Height / Width of viewport',
//     //     // DImensions of the viewport
//     //     document.documentElement.clientHeight,
//     //     document.documentElement.clientWidth
//     // )
//     //
//     // // Scrolling
//     // window.scrollTo(
//     //     s1coords.left + window.pageXOffset,
//     //     s1coords.top + window.pageYOffset
//     // )
//     //
//     // // Another way of scrolling
//     // window.scrollTo({
//     //     left: s1coords.left + window.pageXOffset,
//     //     top: s1coords.top + window.pageYOffset,
//     //     behaviour: 'smooth',
//     // })
//     //
//     // even a better way
//     section1.scrollIntoView({ behavior: 'smooth' })
// })
//
// // Types of events and event handlers
// // -------------------------------------
// // const h1 = document.querySelector('h1')
// // const alertH1 = alert('Addeventlistener: Great! You are reading the heading')
// //
// // h1.addEventListener('mouseover', alertH1)
// //
// // h1.onmouseenter = alertH1
// //
// // Remove eventlistener
// h1.removeEventListener('mouseenter', alertH1)
//
// const oneFunc = function () {
//     alert('This will only come up once')
// }
//
// // Method that fires eventlistener only once
// h1.addEventListener('mouseover', (el) => {
//     oneFunc()
//     h1.removeEventListener('mouseenter', oneFunc)
// })
//
// // remove eventlistener after a set of time
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000)

//Event propagation: Bubbling and capturing
// ----------------------------------------------------

//element not only answering to events originated at the element level, they
//also listen to elements that keeps bubbling up from child levels
// const randomInt = (min, max) =>
//     Math.floor(Math.random() * (max - min + 1) + min)
//
// const randomColor = () =>
//     `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
//
// console.log(randomColor())
//
// // this not really working with arrow function, need to use normal function
// document.querySelector('.nav__link').addEventListener('click', function (el) {
//     // this refers to selected element
//     this.style.backgroundColor = randomColor()
//     console.log('LINK', el.target, el.currentTarget)
//     console.log(el.currentTarget === this)
//
//     // Stop propagation
//     el.stopPropagation()
// })
//
// // .nav__links is parent to .nav__link
// document.querySelector('.nav__links').addEventListener('click', function (el) {
//     this.style.backgroundColor = randomColor()
//     console.log('CONTAINER', el.target, el.currentTarget)
//     console.log(el.currentTarget === this)
//     el.stopPropagation()
// })
// // .nav is parent to .nav__links
// document.querySelector('.nav').addEventListener('click', function (el) {
//     this.style.backgroundColor = randomColor()
//     console.log('NAV', el.target, el.currentTarget)
//     console.log(el.currentTarget === this)
//     el.stopPropagation()
// })
//
// // el will be the same element
// Event delegation - Implementing page navigation
// --------------------------------------------

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnsOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function (e) {
    e.preventDefault()
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
}

const closeModal = function () {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
}

btnsOpenModal.forEach((element) => {
    element.addEventListener('click', openModal)
})

// for (let i = 0; i < btnsOpenModal.length; i++)
//     btnsOpenModal[i].addEventListener('click', openModal)

btnCloseModal.addEventListener('click', closeModal)
overlay.addEventListener('click', closeModal)

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal()
    }
})

const btnScrollTo = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', () => {
    section1.scrollIntoView({ behavior: 'smooth' })
})

// OK for some elements but slow for many - Better to use event delegation
// document.querySelectorAll('.nav__link').forEach(function (element) {
//     element.addEventListener('click', function (event) {
//         event.preventDefault()
//         const id = this.getAttribute('href')
//         console.log(id)
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
//     })
// })

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document
    .querySelector('.nav__links')
    .addEventListener('click', function (event) {
        event.preventDefault()

        // Matching strategy
        if (event.target.classList.contains('nav__link')) {
            const id = event.target.getAttribute('href')
            console.log(id)
            document.querySelector(id).scrollIntoView({ behavior: 'smooth' })
        }
    })
