class SearchView {
  _parentEl = document.querySelectorAll(".search");

  getSearchQuery(e) {
    const query = e.target.firstElementChild.value;
    this._clearSearch(e);
    return query;
  }
  _clearSearch(e) {
    e.target.firstElementChild.value = "";
  }
  addEventHandlerSearch(handler) {
    this._parentEl.forEach((el) => {
      el.querySelector(".search-form").addEventListener("submit", (e) => {
        e.preventDefault();
        handler(e);
      });
    });
  }
}

export default new SearchView();
