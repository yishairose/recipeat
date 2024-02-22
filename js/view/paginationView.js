import View from "./View.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination");

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("pagination__item")) return;
      const currentPage = +e.target.innerText;
      handler(currentPage);
    });
  }

  renderPagination(data) {
    this.clearContainer();
    const resPerPage = data.search.resultsPerPage;
    const noPages = data.search.results.length / resPerPage;

    for (let i = 0; i < noPages; i++) {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        `<a class="pagination__item ${
          data.search.currPage === i + 1 ? "active" : ""
        }" href="#">${i + 1}</a>`
      );
    }
  }
}
export default new PaginationView();
