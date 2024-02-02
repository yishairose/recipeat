import View from "./View";
import icons from "url:../../img/icons.svg";

class ResultsView extends View {
  _parentEl = document.querySelector(".section-recipes__results");
  _generateMarkup() {
    return this._data
      .map((rec) => {
        return `<a href="#${rec.id}" class="recipe-card__link"><div class="recipe-card">
        
        <img
          src="${rec.imageUrl}"
          alt=""
          class="recipe-card__cover-img"
        />
       
        <h3 class="recipe-card__title">${rec.title}</h3>
       
      </div> </a>`;
      })
      .join("")
      .toString();
  }
}

export default new ResultsView();
