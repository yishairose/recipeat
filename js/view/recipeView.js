import icons from "url:../../img/icons.svg";
import View from "./View.js";
class RecipeView extends View {
  _parentEl = document.querySelector(".recipe");

  renderRecipe(recipe) {
    this.clearContainer();
    const html = ` <h1 class="recipe__title heading heading-main-lrg">
    ${recipe.title}
  </h1>
  <div class="recipe__overview">
    <div class="recipe__detail">
      <svg class="recipe__detail-icon">
        <use href="${icons}#time-outline"></use>
      </svg>
      <span class="recipe__detail-data recipe__detail-data--minutes"
        >${recipe.cookingTime}</span
      >
      <span class="recipe__detail-text">minutes</span>
    </div>
    <div class="recipe__detail">
      <svg class="recipe__detail-icon">
        <use href="${icons}#person-sharp"></use>
      </svg>
      <span class="recipe__detail-data recipe__detail-data--servings"
        >${recipe.newServings}</span
      >
      <span class="recipe__detail-text">servings</span>
      <div class="recipe__detail-buttons">
        <button class="recipe__detail-btn recipe__detail-btn--plus" data-servings="${
          recipe.newServings + 1
        }">
          <svg class="recipe__detail-icon">
            <use href="${icons}#add-circle"></use>
          </svg>
        </button>
        <button class="recipe__detail-btn recipe__detail-btn--minus" data-servings="${
          recipe.newServings - 1
        }">
          <svg class="recipe__detail-icon">
            <use href="${icons}#minus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="recipe__bookmark-icon">
      <svg class="recipe__detail-icon">
        <use href="${icons}#${
      recipe.bookmarked ? "bookmark" : "bookmark-outline"
    }"></use>
      </svg>
    </div>
  </div>
  <div class="recipe__image">
    <img
      src="${recipe.imageUrl}"
      alt="Recipe Image"
    />
  </div>
  <div class="ingredients">
    <h2 class="heading heading-sub ingredients__heading">
      Recipe Ingredients
    </h2>
    <ul class="ingredients__list">
    ${recipe.ingredients
      .map((ing) => {
        return `<li class="ingredients__item">${
          ing.quantity
            ? (ing.quantity / recipe.servings) * recipe.newServings
            : ""
        } ${ing.unit} ${ing.description}</li>`;
      })
      .join("")}

    </ul>
  </div>
  <div class="instructions">
    <h2 class="heading heading-sub">Recipe Instructions</h2>
    <p class="instructions__text">
      This recipe was designed by
      <a href="${recipe.sourceUrl}" class="instructions__pub"
        >${recipe.publisher}</a
      >
      Please check out their website for instructions.
    </p>
  </div> `;
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  renderLoader() {
    this.clearContainer();
    const html = `<span class="loader"> </span>`;
    this._parentEl.insertAdjacentHTML("afterbegin", html);
  }

  addEventHandlerUpdateServings(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".recipe__detail-btn");
      if (!btn) return;
      const newServings = +btn.dataset.servings;
      if (newServings < 1) return;
      handler(newServings);
    });
  }
  addEventHandlerAddBookmark(handler) {
    this._parentEl.addEventListener("click", (e) => {
      const bookmarkToggle = e.target.closest(".recipe__detail-icon");
      if (!bookmarkToggle) return;

      handler();
    });
  }
  addEventListenerHashChange(handler) {
    window.addEventListener("hashchange", () => {
      handler(window.location.hash);
    });
  }
}

export default new RecipeView();
