const searchOpen = document.querySelector(".header__search-icon");
const searchClose = document.querySelector(".search-form__close-icon");
const search = document.querySelector(".search");
const searchForm = document.querySelector(".search-form");
const searchInput = document.querySelector(".search-form__input");

searchOpen.addEventListener("click", () => {
  search.classList.toggle("search--visible");
});
searchClose.addEventListener("click", () => {
  searchForm.reset();
  search.classList.toggle("search--visible");
});
