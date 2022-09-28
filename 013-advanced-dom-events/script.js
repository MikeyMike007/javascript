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
//
//
// const handleHover = function (el) {
//     console.log(this, el.currentTarget)
//     if (el.target.classList.contains('nav__link')) {
//         const link = el.target
//         console.log(link.closest('.nav'))
//         const siblings = link.closest('.nav').querySelectorAll('.nav__link')
//         const logo = link.closest('.nav').querySelector('img')
//         siblings.forEach((el) => {
//             if (el !== link) el.style.opacity = this
//         })
//         logo.style.opacity = this
//     }
// }
//
// const nav = document.querySelector('.nav')
//
// // Passing "argument" into handler
// nav.addEventListener('mouseover', handleHover.bind(0.5))
//
// nav.addEventListener('mouseout', handleHover.bind(1.0))

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

// // DOM Traversing
// //
// const h1 = document.querySelector('h1')
// // Traversing downwards - Children
//
// // Select all elements that has class 'highlight' inside the h1 element/tag
// console.log(h1.querySelectorAll('.highlight'))
//
// // Displays all child nodes e.g. text, comments, etc. (A lot of info)
// console.log(h1.childNodes)
//
// // Displays only all the HTML child elements
// console.log(h1.children)
//
// // First child HTML element inside h1
// console.log(h1.firstElementChild)
//
// // Has inline CSS styling i.e. style="color: X"
// h1.firstElementChild.style.color = 'white'
//
// // Last child HTML element inside h1
// console.log(h1.lastElementChild)
//
// // Has inline CSS styling i.e. style="color: X"
// h1.lastElementChild.style.color = 'orangered'
//
// // Going upwards
// console.log('-------')
// // gets the parentNode
// console.log(h1.parentNode)
// // gets the parent element
// console.log(h1.parentElement)
//
// // Gets the closest parent with class 'header'
// h1.closest('.header').style.background = 'var(--gradient-secondary)'
//
// // Gets the closest parent with class 'header'
// // h1.closest('.h1').style.background = 'var(--gradient-primary)'
//
// // Going sideways: Siblings
//
// // Previous element on the same level i.e. no parent and no child
// console.log(h1.previousElementSibling)
//
// // Nextr  element on the same level i.e. no parent and no child
// console.log(h1.nextElementSibling)
//
// console.log(h1.previousSibling)
// console.log(h1.nextSibling)
//
// // All siblings
// console.log(h1.parentElement.children)
//
// // All the siblings to h1
// const temp = [...h1.parentElement.children]
//
// Scale all items with 0.5x exept
// temp.forEach(function (el) {
//     if (el !== h1) {
//         el.style.transform = 'scale(0.5)'
//     }
// })
//
//
//
//

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')

// Event delegation -- choose parent instead of actual element
tabsContainer.addEventListener('click', function (event) {
    // Using event.target would retrieve the button in most cases but if you
    // click on the span element inside the button element then you would only
    // retreive that element. You can fix this problem with closest() function
    const clicked = event.target.closest('.operations__tab')
    if (!clicked) return

    console.log(clicked)

    // Since the eventlistener is now placed on the whole parent container. If
    // the user clicks on the container there exist no classlist, therefor you
    // will get an error in this case. One way to handle this is with a guard
    // statement. Function will justt return if there exist no classList.

    tabs.forEach((element) =>
        element.classList.remove('operations__tab--active')
    )

    tabContent.forEach((el) =>
        el.classList.remove('operations__content--active')
    )

    clicked.classList.add('operations__tab--active')

    console.log(clicked.dataset.tab)
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active')
})

// Menu fade animation

const nav = document.querySelector('.nav')

nav.addEventListener('mouseover', fadeHover.bind('0.5'))
nav.addEventListener('mouseout', fadeHover.bind('1.0'))

function fadeHover(el) {
    if (el.target.classList.contains('nav__link')) {
        const link = el.target
        console.log(this, link)
        const all_links = link.closest('.nav').querySelectorAll('.nav__link')
        all_links.forEach((el) => {
            if (el !== link) {
                el.style.opacity = this
            }
        })
        link.style.opacity = 1.0
        const logo = link.closest('.nav').querySelector('#logo')
        logo.style.opacity = this
    }
}

// Sticky navigation

// const section_1 = document.querySelector('#section--1')
// const initialCoords = section_1.getBoundingClientRect()
// console.log(initialCoords)
//
// window.addEventListener('scroll', function (el) {
//     console.log(window.scrollY)
//
//     if (this.window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky')
//     } else {
//         nav.classList.remove('sticky')
//     }
// })

// Header is the area that ends with section--1 starts
// const header = document.querySelector('.header')
// const navHeight = nav.getBoundingClientRect().height
//
// const stickyNav = function (entries) {
//     console.log(entries)
//     const [entry] = entries
//     // console.log(entry)
//     if (!entry.isIntersection) nav.classList.add('sticky')
//     else nav.classList.remove('sticky')
// }
//
// const headerObserver = new IntersectionObserver(stickyNav, {
//     root: null,
//     threshold: 0,
//     rootMargin: `-${navHeight}px`,
// })
//
// headerObserver.observe(header)
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height
const obsCallback = function (entries, observer) {
    // entries are an array of the threshold entries
    //
    const [entry] = entries // same as const entry = entries[0]
    // entries.forEach((entry) => {
    //     console.log(entry)
    // })
    // // console.log(observer) // this is the obsOption object
    if (!entry.isIntersecting) {
        nav.classList.add('sticky')
    } else {
        nav.classList.remove('sticky')
    }
}

const obsOption = {
    root: null,
    threshold: 0, // Callback function will be called everytime when the root element (viewport) is intersecting the section1 with 10%.
    // threshold 0: when you exit the area with viewport
    // threshold 1: Sometimes unecessary since area is sometimes bigger than viewport
    rootMargin: `-${navHeight}px`,
}

const observer = new IntersectionObserver(obsCallback, obsOption)
observer.observe(header)

// Reveal elements on scroll

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {
    //Only one threshold
    const [entry] = entries
    // document.getElementById(entry.target.id).classList.remove('section--hidden')
    if (!entry.isIntersecting) return
    else entry.target.classList.remove('section--hidden')

    observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})

allSections.forEach(function (el) {
    sectionObserver.observe(el)
    el.classList.add('section--hidden')
})

// Lazy loading
// Performance optimization

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
    const [entry] = entries

    if (!entry.isIntersecting) return
    entry.target.src = entry.target.dataset.src

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img')
    })

    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
})

imgTargets.forEach((img) => imgObserver.observe(img))

// Slider component
const slides = document.querySelectorAll('.slide')
// const slider = document.querySelector('.slider')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')

const createDots = function () {
    slides.forEach(function (_, i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        )
    })
}

const activateDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot')
    dots.forEach(function (el) {
        el.classList.remove('dots__dot--active')
    })
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active')
}

const gotoSlide = function (slide) {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`
    })
    activateDot(slide)
}

const nextSlide = function () {
    if (curSlide === maxSlide) curSlide = 0
    else curSlide++

    gotoSlide(curSlide)
}

const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide
    else curSlide--

    gotoSlide(curSlide)
}

// Variables
//
// Number of the current selected slide
let curSlide = 0
// Number of slides
const maxSlide = slides.length - 1

// Create the dots graphically in the slider
createDots()

// Activate slide 0
gotoSlide(0)

// Eventlisteners
btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide()

    e.key === 'ArrowRight' && nextSlide()
})

dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
        // const slide = e.target.dataset.slide same as below with destructuring
        const { slide } = e.target.dataset
        gotoSlide(slide)
    }
})

// Lifecycle DOM events
//
// You dont need to add everything in this eventhandler
// You can solve it by putting the script tag in the end of the html body.
// Or you can use defer and put the script tag in the head
document.addEventListener('DOMContentLoaded', function (e) {
    console.log('HTML parsed and DOM tree built.')
    console.log(e)
})

window.addEventListener('load', function (e) {
    console.log('Page fully loaded inc. images and css')
})

window.addEventListener('beforeunload', function (e) {
    e.preventDefault()
    console.log(e)
    e.returnValue = ''
})
