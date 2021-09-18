"use strict";
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
/* SELECT ALL BUTTONS - ARRAY OF 3 */
const btnsOpenModal = document.querySelectorAll(".show-modal");

const openModal = () => {
  modal.classList.remove("hidden"); // NO DOT, DOT IS ONLY FOR QUERYSELECTOR
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

/* KEYPRESSES ARE GLOBAL EVENTS - THATS THE REASON FOR ADDING THE EVENTLISTENER TO THE WHOLE DOCUMENT */
/* JAVASCRIPT SENDS THE PARAMETER e - SEE CONSOLE AT KEYPRESS */
document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});
