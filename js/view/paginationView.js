import View from "./View.js";

class PaginationView extends View {
  _parentEl = document.querySelector(".pagination__list ");

  addHandlerPagination(handler) {
    this._parentEl.addEventListener("click", (e) => {
      if (!e.target.classList.contains("pagination__item")) return;
      const currentPage = +e.target.innerText;
      handler(currentPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (this._data.results.length === 0) return;

    let html = ` <li>
    <a
      class="pagination__item pagination__item--disabled"
      aria-label="Go to previous page"
    >
      <svg
        class="pt4-icon pt4-icon--xs pt4-margin-right-3xs pt4-flip-x"
        viewBox="0 0 16 16"
      >
        <polyline
          points="6 2 12 8 6 14"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
      <span>Prev</span>
    </a>
  </li>
`;
    for (let i = 0; i < numPages; i++) {
      html += `  <li class="pt4-display@sm">
      <a class="pagination__item ${
        i + 1 === this._data.currentPage ? `pagination__item--selected` : ``
      }" aria-label="Go to page ${i + 1}">${i + 1}</a>
    </li>`;
    }
    html += ` <li>
    <a class="pagination__item" aria-label="Go to next page">
      <span>Next</span>
      <svg
        class="pt4-icon pt4-icon--xs pt4-margin-left-3xs"
        viewBox="0 0 16 16"
      >
        <polyline
          points="6 2 12 8 6 14"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        />
      </svg>
    </a>
  </li>`;
    return html;
  }
}
export default new PaginationView();
