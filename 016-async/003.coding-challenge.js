///////////////////////////////////////
// Coding Challenge #3
// PART 2
// 1. Create an async function 'loadAll' that receives an array of image paths 'imgArr';
// 2. Use .map to loop over the array, to load all the images with the
// 'createImage' function (call the resulting array 'imgs')
// 3. Check out the 'imgs' array in the console! Is it like you expected?
// 4. Use a promise combinator function to actually get the images from the array 😉
// 5. Add the 'paralell' class to all the images (it has some CSS styles).

// TEST DATA: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']. To test, turn off the 'loadNPause' function.

// GOOD LUCK 😀

const imageContainer = document.querySelector('.countries')
imageContainer.style.opacity = 1.0

function createImage(imagePath) {
  return new Promise(function (resolve, reject) {
    const image = document.createElement('img')
    imageContainer.append(image)
    image.src = imagePath

    // Listen to loadevent
    image.addEventListener('load', (event) => {
      resolve(image)
    })

    // Listen to error event
    image.addEventListener('error', (event) => {
      reject(new Error('Image not found'))
    })
  })
}

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000)
  })
}

const test = async function (path) {
  return await createImage(path)
}

const loadAll = async function (imgArr) {
  try {

    // Method 1 - Jonas code
    const imgs = imgArr.map(async (img) => await createImage(img))
    const imgEl = await Promise.all(imgs)
    imgEl.forEach((img) => img.classList.add('parallel'))

		// Method 2
    // Question 1: Does Jonas code do the same as this?
    // Answer: Yes, exact same code
    // Question 2: Why are they starting to load simultaneously and not after each other like in 'then' chaining.
    // Question 3: Why do the array imgs2 contain promises and not image elements? Shouldnt 'return await createImage(..)' return a data element and not a promise?
    // Answer: All async function returns promises, even if they have been resolved and extracted of its data.
    //					So even if this function would have returned a string e.g., "An example string", the outcome would have been a resolved Promise
    const imgs2 = [
      (async function() {return await createImage(imgArr[0])})(),
      (async function() {return await createImage(imgArr[1])})(),
      (async function() {return await createImage(imgArr[2])})(),
    ]
    const imgEl2 = await Promise.all(imgs2)
    imgEl2.forEach((img) => img.classList.add('parallel'))

  } catch (err) {
    console.log(err.message)
  }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'])
