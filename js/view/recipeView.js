import icons from "url:../../img/icons.svg";
import View from "./View.js";
class RecipeView extends View {
  _parentEl = document.querySelector(".modal__content-container--recipe");
  _modal = document.querySelector(".modal--recipe");

  addEventHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, handler)
    );
  }
  _displayModal() {
    this._modal.classList.add("modal--visible");
  }
  addEventHandlerClose(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".modal__close-btn");
      if (!btn) return;
      handler();
    });
  }
  addEventHandlerUpdateServings(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".recipe__detail-btn");
      if (!btn) return;
      const newServings = +btn.dataset.updateTo;
      if (newServings < 1) return;
      handler(newServings);
    });
  }
  addEventHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".recipe__bookmark-btn");
      if (!btn) return;
      handler();
    });
  }

  closeModal() {
    this._modal.classList.remove("modal--visible");
    this._clearElement();
    window.location.hash = "";
  }

  _generateMarkup() {
    this._displayModal();
    return `
    <button class="modal__close-btn">&times;</button>
    <img
      class="recipe__img"
      src="${this._data.imageUrl}"
      alt="recipe-img"
    />
    <h1 class="recipe__title">${this._data.title}</h1>
    <div class="recipe__overview-section">
      <div class="recipe__detail">
        <svg class="recipe__detail-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__detail-data recipe__detail-data--minutes"
          >${this._data.cookingTime}</span
        >
        <span class="recipe__detail-text">minutes</span>
      </div>
      <div class="recipe__detail">
        <svg class="recipe__detail-icon">
          <use href="img/icons.svg#icon-users"></use>
        </svg>
        <span class="recipe__detail-data recipe__detail-data--servings"
          >${this._data.servings}</span
        >
        <span class="recipe__detail-text">servings</span>
        <div class="recipe__detail-buttons">
          <button class="recipe__detail-btn recipe__detail-btn--minus" data-update-to="${
            this._data.servings - 1
          }">
            <svg class="recipe__detail-icon">
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="recipe__detail-btn recipe__detail-btn--plus" data-update-to="${
            this._data.servings + 1
          }">
            <svg class="recipe__detail-icon">
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>
  
      <div class="recipe__bookmark-btn">
        <svg class="recipe__bookmark-icon">
          <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? "-fill" : ""
    }"></use>
        </svg>
      </div>
    </div>
    <div class="recipe__ingredients">
      <h2 class="heading-sub">Recipe Ingredients</h2>
      <ul class="recipe__ingredients-list">
      ${this._data.ingredients
        .map((item) => {
          return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          item.quantity ? new Fraction(item.quantity).toString() : ""
        }</div>
        <div class="recipe__description">
        <span class="recipe__unit">${item.unit}</span>
          ${item.description}
        </div>
      </li>
      `;
        })
        .join("")}
      </ul>
    </div>
    <div class="recipe__instructions">
      <h2 class="heading-sub">How To Cook It</h2>
      <p class="recipe__instructions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please
        check out directions at their website.
      </p>
      <a
        class="recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
  `;
  }
}

export default new RecipeView();
