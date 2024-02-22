import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _resultsCont = document.querySelector(".results");
  _parentEl = document.querySelector(".results-container");

  renderSearchQuery(query) {
    this._resultsCont.querySelector(
      ".results__search-query"
    ).innerText = `Results for ${query}:`;
  }

  renderResults(data) {
    if (data instanceof Error) {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        `   <div class="upload-error">
        <svg>
          <use href="${icons}#error"></use>
        </svg>
        <p class="upload-error__text">
         ${data}
        </p>
      </div>`
      );
      return;
    }
    data.forEach((res) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        `<a href="/recipe.html#${res.id}" class="results-container__card">
      <div class="results-container__card-img">
        <img
          src="${res.imageUrl}"
          alt="Recipe Image"
        />
      </div>
      <h3 class="results-container__card-name">
        ${res.title}
      </h3>
    </a>`
      );
    });
  }
  renderLoader() {
    const html = `<span class="placeholder"> </span>`;
    for (let i = 0; i < 8; i++) {
      this._parentEl.insertAdjacentHTML("afterbegin", html);
    }
  }
}

export default new ResultsView();
