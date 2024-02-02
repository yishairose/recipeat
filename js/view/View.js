export default class View {
  _data;
  render(data) {
    this._data = data;
    const html = this._generateMarkup();
    if (!html) return;
    this._clearElement();
    this._parentEl.innerHTML = html;
  }
  update(data) {
    this._data = data;
    const newHtml = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newHtml);
    const newEls = Array.from(newDOM.querySelectorAll("*"));
    const oldDOM = Array.from(this._parentEl.querySelectorAll("*"));

    newEls.forEach((el, i) => {
      const curEl = oldDOM[i];
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = el.textContent;
      }
      if (!el.isEqualNode(curEl)) {
        Array.from(el.attributes).forEach((att) => {
          curEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
  _clearElement() {
    this._parentEl.innerHTML = "";
  }

  // renderSpinner() {
  //   const loader = document.querySelector(".loader--modal");
  //   loader.classList.add("loader--visible");
  // }
}
