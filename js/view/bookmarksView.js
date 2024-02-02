import View from "./View";

class bookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks");
  addEventHandlerOpenBookmarkTab(handler) {
    document
      .querySelector(".header__link--bookmark-btn")
      .addEventListener("click", handler);
  }
  closeTab() {
    this._parentEl.innerHTML = "";
  }
  _generateMarkup() {
    const markup = this._data
      .map((bkm) => {
        return `<li class="bookmarks__item">
        <a class="bookmarks__link" href="#${bkm.id}">
          <figure class="bookmarks__fig">
            <img
              src="${bkm.imageUrl}"
              alt="Image"
            />
          </figure>
          <div class="bookmarks__data">
            <h4 class="bookmarks__name">${bkm.title.slice(0, 25)}${
          bkm.title.length > 25 ? "..." : ""
        }</h4>
            <p class="bookmarks__publisher">${bkm.publisher}</p>
          </div>
        </a>
      </li>`;
      })
      .join("")
      .toString();
    return markup;
  }
}

export default new bookmarksView();
