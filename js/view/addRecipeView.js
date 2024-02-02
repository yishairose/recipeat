import icons from "url:../../img/icons.svg";
import View from "./View.js";

class addRecipeView extends View {
  _parentEl = document.querySelector(".modal__content-container--add-recipe");
  _modal = document.querySelector(".modal--add-recipe");
  _form = document.querySelector(".upload");
  _uploadBtn = document.querySelector(".upload__btn");

  displayModal() {
    this._modal.classList.add("modal--visible");
  }
  addEventHandlerClose(handler) {
    document
      .querySelector(".modal__close-btn")
      .addEventListener("click", handler);
  }
  addEventHandlerOpen(handler) {
    document
      .querySelector(".header__link--add-recipe-btn")
      .addEventListener("click", handler);
  }

  closeModal() {
    this._modal.classList.remove("modal--visible");
    console.log(window.location.pathname);
    window.location.pathname = "";
  }

  addEventHandlerUpload(handler) {
    this._form.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new addRecipeView();
