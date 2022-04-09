'use strict'

let startScore = 20
let score
let highScore = 0
let secretNumber = Math.trunc(Math.random() * 20) + 1

let btnCheck = document.querySelector('.btn-check')
let btnAgain = document.querySelector('.btn-again')
let labelGameStatus = document.querySelector('.status-guessed-number')
let body = document.querySelector('body')
let labelScore = document.querySelector('.score')
let labelHighScore = document.querySelector('.highscore')
let inputNumber = document.querySelector('.guessed-number')

let colorGreen = '#00FF00'
let colorGrey = '#222'

let initializeGame = () => {
    score = startScore
    labelScore.textContent = score.toString()
    body.style.backgroundColor = colorGrey
    labelGameStatus.textContent = 'Start guessing'
    labelHighScore.textContent = highScore.toString()
    inputNumber.textContent = ''
}

initializeGame()

btnCheck.addEventListener('click', () => {
    let number = parseInt(inputNumber.value)
    if (!number) {
        throw new Error('Please provide a number')
    }
    if (number === secretNumber) {
        labelGameStatus.textContent = 'You guessed the right number'
        body.style.backgroundColor = colorGreen

        if (score > highScore) {
            highScore = score
            labelHighScore.textContent = highScore.toString()
        }
    } else if (number > secretNumber) {
        score -= 1

        if (score <= 0) {
            labelScore.textContent = `${0}`
            labelGameStatus.textContent = 'You loose, please start over'
        } else {
            labelGameStatus.textContent = 'Too high'
            labelScore.textContent = score.toString()
        }
    } else {
        score -= 1
        if (score <= 0) {
            labelScore.textContent = `${0}`
            labelGameStatus.textContent = 'You loose, please start over'
        } else {
            labelGameStatus.textContent = 'Too low'
            labelScore.textContent = score.toString()
        }
    }
})

btnAgain.addEventListener('click', initializeGame)
