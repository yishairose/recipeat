const searchOpen = document.querySelector(".header__search-icon");
const searchClose = document.querySelector(".search-form__close-icon");
const search = document.querySelector(".search");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form__input");
const uploadBtn = document.querySelector(".header__upload-icon");
const uploadOverlay = document.querySelector(".upload-modal");
const closeOverlay = document.querySelector(".modal__close-btn");

searchOpen.addEventListener("click", () => {
  search.classList.toggle("search--visible");
});
searchClose.addEventListener("click", () => {
  searchForm.reset();
  search.classList.toggle("search--visible");
});

uploadBtn.addEventListener("click", () => {
  uploadOverlay.classList.toggle("modal-visible");
});
closeOverlay.addEventListener("click", () => {
  uploadOverlay.classList.toggle("modal-visible");
});
