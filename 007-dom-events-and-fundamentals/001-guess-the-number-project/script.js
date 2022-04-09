'use strict'

// /* 7.71 : WHATS THE DOM? */
// console.log(document.querySelector(".message").textContent);

// /* 7.72: SELECTING AND MANIPULATING DOM ELEMENTS */
// document.querySelector(".message").textContent = "Correct number";

// document.querySelector(".number").textContent = 13;
// document.querySelector(".score").textContent = 10;
// document.querySelector(".guess").value = 23;

/* 7.73 - 7.78 */

let secretNumber = Math.trunc(Math.random() * 20) + 1
let score = 20
let highScore = 0

const displayMessage = (message) => {
    document.querySelector('.message').textContent = message
}

document.querySelector('.highscore').textContent = highScore

document.querySelector('.check').addEventListener('click', () => {
    const guess = Number(document.querySelector('.guess').value)
    //console.log(typeof guess); // String

    // When there is no input
    if (!guess) {
        displayMessage('No number!')

        // When player wins
    } else if (guess === secretNumber) {
        displayMessage('Correct number')
        document.querySelector('body').style.backgroundColor = '#60b347'
        document.querySelector('.number').textContent = secretNumber
        document.querySelector('.number').style.width = '30rem'
        if (score > highScore) {
            highScore = score
            document.querySelector('.highscore').textContent = highScore
        }
    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? 'Too high' : 'To low')
            score--
            document.querySelector('.score').textContent = score
        } else {
            document.querySelector('.score').textContent = 0
            document.querySelector('.message').textContent =
                'You lost the game!'
        }
    }
})

document.querySelector('.again').addEventListener('click', () => {
    // Restore to original data
    score = 20
    secretNumber = Math.trunc(Math.random() * 20) + 1
    document.querySelector('.score').textContent = score
    displayMessage('Start guessing')
    document.querySelector('body').style.backgroundColor = '#222'
    document.querySelector('.number').style.width = '15rem'
    document.querySelector('.number').textContent = '?'
    document.querySelector('.guess').value = ''
})
