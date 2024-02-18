import { API_URL, RESULTS_PER_PAGE } from "./config.js";
export let state = {
  search: {
    query: "",
    results: [],
    currPage: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
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

export function addQuerytoState(query) {
  state.search.query = query;
  updateLocalStorage();
}

export function getLocalStorage() {
  state = JSON.parse(localStorage.getItem("state"));
}
export function controlPagination(newPage) {
  state.search.currPage = newPage;
  updateLocalStorage();
}

export function paginateData(data) {
  return data.splice(
    (state.search.currPage - 1) * state.search.resultsPerPage,
    state.search.resultsPerPage
  );
}
