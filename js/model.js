import { API_URL, RESULTS_PER_PAGE } from "./config.js";
export let state = {
  search: {
    query: "",
    results: [],
    currPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  recipe: {},
  bookmarks: [],
};
export function updateLocalStorage() {
  localStorage.setItem("state", JSON.stringify(state));
}
async function getJSON(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getResults(searchTerm) {
  try {
    const results = await getJSON(`${API_URL}?search=${searchTerm}`);
    if (!results.status === "sucess") throw new Error(`${results.status}`);
    if (results.data.recipes.length < 1)
      throw new Error(`No results found for "${state.search.query}"`);
    state.search.results = results.data.recipes.map((res) => {
      return {
        publisher: res.publisher,
        imageUrl: res.image_url,
        title: res.title,
        id: res.id,
      };
    });
    state.search.query = searchTerm;
    updateLocalStorage();
  } catch (error) {
    state.search.results = [];
    throw error;
  }
}

export async function getRecipe(id) {
  try {
    const res = await getJSON(`${API_URL}/${id}`);
    if (!res.status === "sucess") throw new Error(`${res.status}`);
    const recipe = res.data.recipe;
    state.recipe = {
      publisher: recipe.publisher,
      ingredients: recipe.ingredients,
      sourceUrl: recipe.source_url,
      imageUrl: recipe.image_url,
      title: recipe.title,
      servings: recipe.servings,
      newServings: recipe.servings,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      bookmarked: false,
    };
    state.recipe.bookmarked = state.bookmarks.some(
      (bkm) => bkm.id === state.recipe.id
    );
    updateLocalStorage();
  } catch (error) {
    console.log(error);
  }
}

export function addQuerytoState(query) {
  state.search.query = query;
  updateLocalStorage();
}

export function getLocalStorage() {
  state = JSON.parse(localStorage.getItem("state"));
}
export function resetLocalStorage() {
  getLocalStorage();
  state.search.results = [];
  state.search.query = "";
  state.recipe = {};
  updateLocalStorage();
}
export function controlPagination(newPage) {
  state.search.currPage = newPage;
  updateLocalStorage();
}

export function paginateData(data) {
  const startIndex = (state.search.currPage - 1) * state.search.resultsPerPage;
  const endIndex = startIndex + state.search.resultsPerPage;
  return data.slice(startIndex, endIndex);
}

export function updateServings(newServings) {
  state.recipe.newServings = newServings;
}
export function updateBookmarks() {
  state.recipe.bookmarked = !state.recipe.bookmarked;
  if (state.recipe.bookmarked) {
    state.bookmarks.push(state.recipe);
  } else if (!state.recipe.bookmarked) {
    const index = state.bookmarks.findIndex((bkm) => {
      return state.recipe.id === bkm.id;
    });
    state.bookmarks.splice(index, 1);
  }
  updateLocalStorage();
}
