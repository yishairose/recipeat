import * as model from "./model.js";
import recipeView from "./view/recipeView.js";
import searchView from "./view/searchView.js";
import resultsView from "./view/resultsView.js";
import paginationView from "./view/paginationView.js";
import bookmarksView from "./view/bookmarksView.js";
import addRecipeView from "./view/addRecipeView.js";

const recipeModal = document.querySelector(".modal--recipe");

async function renderRecipe(e) {
  //Extract ID from URl
  const id = window.location.hash.slice(1);
  if (!id) return;

  //render spinner
  //Load recipe from API
  await model.loadRecipe(id);

  recipeView.render(model.state.recipe);
}

async function searchResults() {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadResults(query);
    resultsView.render(model.showCurrentPage(model.state.search.currentPage));
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
}

function controlPagination(page) {
  resultsView.render(model.showCurrentPage(page));
  paginationView.render(model.state.search);
}

function controlServings(newServings) {
  model.updateServings(newServings);
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

function controlAddBookmark() {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
}

function controlBookmarkTab() {
  if (!model.state.bookmarksOpen) {
    bookmarksView.render(model.state.bookmarks);
  } else {
    bookmarksView.closeTab();
  }

  model.bookmarksTab();
}

async function controlUploadRecipe(newRecipe) {
  await model.uploadRecipe(newRecipe);
  console.log(model.state.recipe);
  addRecipeView.closeModal();
  recipeView.render(model.state.recipe);
  window.history.pushState(null, "", `#${model.state.recipe.id}`);
}

function init() {
  recipeView.addEventHandlerRender(renderRecipe);
  recipeView.addEventHandlerClose(recipeView.closeModal.bind(recipeView));
  addRecipeView.addEventHandlerClose(
    addRecipeView.closeModal.bind(addRecipeView)
  );
  addRecipeView.addEventHandlerOpen(
    addRecipeView.displayModal.bind(addRecipeView)
  );
  addRecipeView.addEventHandlerUpload(controlUploadRecipe);
  recipeView.addEventHandlerUpdateServings(controlServings);
  recipeView.addEventHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addEventHandlerOpenBookmarkTab(controlBookmarkTab);
  searchView.addEventHandlerSearch(searchResults);
  paginationView.addHandlerPagination(controlPagination);
}

init();
