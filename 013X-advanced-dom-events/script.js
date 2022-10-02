'use strict';
// 1. Navbar - Set opacity effect
// ----------------------------------------------------

// Select navigation bar
const nav = document.querySelector('.nav')

// Event listener for 'mouseover' event - Sets the opacity level for all elements in class 'nav__link' to 0.5
nav.addEventListener('mouseover', handleHoover.bind(0.5))

// Event listener for 'mouseout' event - Sets the opacity level for all elements in class 'nav__link' to 0.5
nav.addEventListener('mouseout', handleHoover.bind(1.0))

/**
 * A callback function to set the opacity levels for nav component on mouseover and mouseout events
 * @param {Event} event - The triggered event
 */
function handleHoover(event) {
  // Event delegation: We are only interested to manipulate the elements that are members of class 'nav__link'
  if (event.target.classList.contains('nav__link')) {
    // currentLinkElement is the element that triggered the event handler and is a member of the class 'nav__link'
    const currentLinkElement = event.target
    const logo = currentLinkElement.closest('.nav').querySelector('img')
    // allLinkElements contain all elements that belong to the class 'nav__link'
    const allLinkElements = event.target.closest('.nav').querySelectorAll('.nav__link')
    allLinkElements.forEach(linkElement => {
      // Set the opacity level for all elements except the one that triggered the eventhandler
      if (linkElement !== currentLinkElement) linkElement.style.opacity = this
    })
    // Set the opacity level for logo
    logo.style.opacity = this
    event.stopPropagation()
  }
}
// END 1.0 Navbar
// ----------------------------------------------------



// 2. Navbar links - smooth scrolling
// ----------------------------------------------------

/**
 * A callback function that handles smooth scrolling from the navigationbar links to the different sections in the document
 * @param {Event} event 
 */
function smoothScroll(event) {
  event.preventDefault()

  if (event.target.classList.contains('nav__link')) {
    const href = event.target.getAttribute('href')
    document.querySelector(href).scrollIntoView({behavior: 'smooth'})
  }

    event.stopPropagation()
}

nav.addEventListener('click', smoothScroll)

// END 2.0 Navbar links
// ----------------------------------------------------


// 3. Learn more link - Smooth scrolling
// ----------------------------------------------------

/*
 * Scroll 'smoothly' to #section--1 when clicking on the 'Learn more' button
*/
const btnLearnMore = document.querySelector('.btn--scroll-to')
btnLearnMore.addEventListener('click', function() {
  document.querySelector('#section--1').scrollIntoView({behavior: 'smooth'})
})

// END 3.0 Learn more link
// ----------------------------------------------------


// 4.0 Navbar dissapear / appear during scrolling
// ----------------------------------------------------
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

/*
* Set intersection properties for the intersection observer between the header section and the viewport
* Following settings regulate the animation of the navigation element
*
*/
let headerViewportIntersectOptions = {
  root: null, // null means viewport
  rootMargin: `-${navHeight}px`, // Display navigation X px before viewport intersects section 1
  threshold: 0.0 // Callback will be triggered when there is no overlap between viewport and header
}

/**
 * A callback function that is triggered when the options of the IntersectionObserver are fulfilled
 * @param {[IntersectionObserverEntry]} entries - An instance that contains information about the intersection event
 */
function headerViewportIntersectCallback(entries) {
  const [entry] = entries // Use this when there is only one entry i.e. one threshold

  if (!entry.isIntersecting) {
    nav.classList.add('sticky')
  }
  else {
    nav.classList.remove('sticky')
  }
}

const observer = new IntersectionObserver(headerViewportIntersectCallback, headerViewportIntersectOptions)
observer.observe(header)

// END 4.0
// ----------------------------------------------------


// 5.0  Lazy loading of images
// ----------------------------------------------------

// Select all the images
// const images = document.querySelector('.features').querySelectorAll('img')

// A better way is to use following. Select all <img> tags that has an attribute 'data-src'
const images = document.querySelectorAll('img[data-src]')

let imageViewportIntersectOptions = {
  root: null, // null means viewport
  rootMargin: `100px`, // Add some margin to threshold
  threshold: 0 // Callback will be triggered when the viewport intersects image
}
/**
 * A callback function that is triggered when the options of the IntersectionObserver are fulfilled
 * with regards the intersection between the viewport and the selected images
 * @param {[IntersectionObserverEntry]} entries - An instance that contains information about the intersection event
 */
function imageViewportIntersectCallback(entries) {
  const [entry] = entries // Use this when there is only one entry i.e. one threshold

  if (!entry.isIntersecting) return

  // Following code will be runned when there is 100px margin to next image / viewport intersection

  // The load event is triggered when an image has fully loaded
  entry.target.addEventListener('load', function() {
    // Remove blur When image has fully loaded
    this.classList.remove('lazy-img')
  })

  // Load full sized image
  // entry.target.src = entry.target.getAttribute('data-src')
  // Following code is more correct to use
  entry.target.src = entry.target.dataset.src

  // Unobserve
  imageObserver.unobserve(entry.target)

}

// Initate observer
const imageObserver = new IntersectionObserver(imageViewportIntersectCallback, imageViewportIntersectOptions)

// Observe all selected images
images.forEach(image => imageObserver.observe(image))
// END 5.0
// ----------------------------------------------------




// 6.0 Tabbed component - change text and tabs jump up couple of pixels
// ----------------------------------------------------
const operationsContainer = document.querySelector('.operations')
const allOperationButtons = document.querySelector('.operations__tab-container').querySelectorAll('.btn')
const allOperationContents = document.querySelectorAll('.operations__content')

operationsContainer.addEventListener('click', function(event) {

  // Return if buttons aren't clicked - Need to make a special case because <span> tag
  // inside <button> tag
  if (!event.target.closest('.btn')) return

  // Remove all buttons and contents from the operations__X--active classlist
  allOperationButtons.forEach(button => button.classList.remove('operations__tab--active'))
  allOperationContents.forEach(content => content.classList.remove('operations__content--active'))

  // Get the data-tab attribute from current pushed button
  const tab = event.target.dataset.tab
  const activeContentElement = document.querySelector(`.operations__content--${tab}`)
  // Add the selected elements to the operations__X--active classlist
  activeContentElement.classList.add('operations__content--active')
  event.target.classList.add('operations__tab--active')

})
// END 6.0
// ----------------------------------------------------


// 7. Carousel
// ----------------------------------------------------

// DOM Elements
const slides = document.querySelectorAll('.slide')
const btnRight = document.querySelector('.slider__btn--right')
const btnLeft = document.querySelector('.slider__btn--left')
const dotContainer = document.querySelector('.dots')
createDots()
const dotButtons = document.querySelectorAll('.dots__dot')


// Function definitions

/**
 * Creates and inserts the dot buttons into the dotContainer
 */
function createDots() {
  slides.forEach((_, index) => {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot dots__dot--${index}" data-id="${index}"></button>`)
  })
}

/**
 * Renders the carousel
 */
function renderCarousel() {
  slides.forEach((slide, index) => {
    let pixels = (index - activeSlide) * 100
    slide.style.transform = `translateX(${pixels}%)`

  })
}

/**
 * Shifts the carousel one step to the right or to the beginning
 */
function shiftRight() {
  if (activeSlide === slides.length-1) activeSlide = 0
  else activeSlide++
  renderCarousel()
  renderDots()

}

/**
 * Shifts the carousel one step to the left or to the end
 */
function shiftLeft() {
  if (activeSlide === 0) activeSlide = slides.length - 1
  else activeSlide--
  renderCarousel()
  renderDots()
}

/**
 * Sets new active slice based on argument
 * @param {number} slide - New active slide
 */
function gotoSlide(slide) {
  activeSlide = slide
  renderCarousel()
  renderDots()

}

/**
 * Renders the dots - the active slide gets a slightly darker color on its dot
 */
function renderDots(){
  dotButtons.forEach(function(button) {
    button.classList.remove('dots__dot--active')
  })
  document.querySelector(`.dots__dot--${activeSlide}`).classList.add('dots__dot--active')
}

// Event listeners
dotContainer.addEventListener('click', function(event) {
  gotoSlide(+event.target.dataset.id)
})



btnRight.addEventListener('click',shiftRight)
btnLeft.addEventListener('click', shiftLeft)

// Code to run
let activeSlide = 0
renderCarousel()
renderDots()

///////////////////////////////////////

// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
