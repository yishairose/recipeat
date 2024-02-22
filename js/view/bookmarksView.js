import icons from "url:../../img/icons.svg";
import View from "./View";

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__content");

  renderBookmarks(bookmarks) {
    this.clearContainer();
    if (bookmarks.length < 1) {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        ` <div class="bookmarks__error">
        <svg>
          <use href="${icons}.svg#error"></use>
        </svg>
        <p class="bookmarks__error-text">
          You have no bookmarks yet to display!
        </p>
      </div>
      `
      );
    }
    bookmarks.forEach((bkm) => {
      this._parentEl.insertAdjacentHTML(
        "beforeend",
        `<a href="/recipe.html#${bkm.id}">
    <div class="bookmarks__item">
    <div class="bookmarks__img">
      <img src="${bkm.imageUrl}" alt="" />
    </div>
    <div class="bookmarks__text">
      <p class="bookmarks__title">${bkm.title}</p>
      <p class="bookmarks__pub">${bkm.publisher}</p>
    </div>
    <svg class="bookmarks__delete-icon">
      <use href="${icons}#delete"></use>
    </svg>
  </div></a>`
      );
    });
  }
}

export default new bookmarksView();
