import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";

async function newSearch(e) {
  const query = searchView.getSearchQuery(e);
  if (!query) return;
  model.addQuerytoState(query);
  window.location.href = `/results.html`;
}

async function init() {
  // if (localStorage.getItem("state") === null) model.updateLocalStorage();

  switch (window.location.pathname) {
    case "/results.html":
      try {
        model.getLocalStorage();
        resultsView.renderLoader();
        await model.getResults(model.state.search.query);
        resultsView.renderSearchQuery(model.state.search.query);
        resultsView.clearContainer();
        model.controlPagination(2);
        resultsView.renderResults(
          model.paginateData(model.state.search.results)
        );
        paginationView.renderPagination(model.state);
        // paginationView.addHandlerPagination(model.controlPagination);
      } catch (error) {
        resultsView.clearContainer();
        resultsView.renderResults(error);
        console.error(error);
      }

      break;
  }
  searchView.addEventHandlerSearch(newSearch);
}
init();
