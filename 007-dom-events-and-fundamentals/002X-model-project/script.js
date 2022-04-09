let btnsModal = document.querySelectorAll('.btn-modal')
let btnCloseModal = document.querySelector('.btn-close-modal')
let modal = document.querySelector('.modal')
let overlay = document.querySelector('.overlay')
let body = document.querySelector('body')
console.log(modal)

for (const button of btnsModal) {
    button.addEventListener('click', () => {
        modal.classList.remove('hidden')
        overlay.classList.remove('hidden')
    })
}

btnCloseModal.addEventListener('click', () => {
    modal.classList.add('hidden')
    overlay.classList.add('hidden')
})

overlay.addEventListener('click', () => {
    if (
        !modal.classList.contains('hidden') &&
        !overlay.classList.contains('hidden')
    ) {
        modal.classList.add('hidden')
        overlay.classList.add('hidden')
    }
})

document.addEventListener('keydown', (e) => {
    console.log(e)
    if (e.key === 'Escape') {
        modal.classList.add('hidden')
        overlay.classList.add('hidden')
    }
})
