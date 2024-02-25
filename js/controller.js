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

function renderPageResults(data, page = 1) {
  resultsView.renderSearchQuery(data.query);
  resultsView.clearContainer();
  model.controlPagination(page);
  resultsView.renderResults(model.paginateData(data.results));
  paginationView.renderPagination(model.state);
}
function newPage(page) {
  renderPageResults(model.state.search, page);
}

async function renderRecipe(hash) {
  const id = hash.substring(1);
  recipeView.renderLoader();
  await model.getRecipe(id);
  recipeView.renderRecipe(model.state.recipe);
}
function controlServings(newServings) {
  model.updateServings(newServings);
  recipeView.renderRecipe(model.state.recipe);
}

function controlBookmarks() {
  model.updateBookmarks();
  recipeView.renderRecipe(model.state.recipe);
  bookmarksView.renderBookmarks(model.state.bookmarks);
}

async function init() {
  switch (window.location.pathname) {
    case "/":
    case "/index.html":
      if (localStorage.getItem("state") == null) {
        model.updateLocalStorage();
      }
      model.resetLocalStorage();
      bookmarksView.renderBookmarks(model.state.bookmarks);
      break;
    case "/results.html":
      try {
        model.getLocalStorage();
        bookmarksView.renderBookmarks(model.state.bookmarks);
        resultsView.renderLoader();
        await model.getResults(model.state.search.query);
        renderPageResults(model.state.search);
        paginationView.addHandlerPagination(newPage);
      } catch (error) {
        resultsView.clearContainer();
        resultsView.renderResults(error);
        console.error(error);
      }

      break;
    case "/recipe.html":
      model.getLocalStorage();
      bookmarksView.renderBookmarks(model.state.bookmarks);
      recipeView.addEventListenerHashChange(renderRecipe);
      renderRecipe(window.location.hash);
      recipeView.addEventHandlerUpdateServings(controlServings);
      recipeView.addEventHandlerAddBookmark(controlBookmarks);
      break;
  }
  searchView.addEventHandlerSearch(newSearch);
}
init();
