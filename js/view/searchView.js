class SearchView {
  #parentEl = document.querySelector(".search-form");

  getQuery() {
    const query = this.#parentEl.querySelector(".search-form__input").value;
    this.#clearSearch();
    return query;
  }
  #clearSearch() {
    this.#parentEl.querySelector(".search-form__input").value = "";
  }
  addEventHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
