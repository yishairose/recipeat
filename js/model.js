import { API_URL, RESULTS_PER_PAGE, API_KEY } from "./config.js";
import { loadJSON, sendJSON } from "./helpers.js";
export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    currentPage: 1,
  },
  bookmarks: [],
  bookmarksOpen: false,
};

function createRecipeObject(data) {
  const {
    id,
    title,
    publisher,
    source_url: sourceUrl,
    servings,
    cooking_time: cookingTime,
    ingredients,
    image_url: imageUrl,
  } = data;
  const recipe = {
    id,
    title,
    publisher,
    sourceUrl,
    servings,
    cookingTime,
    ingredients,
    imageUrl,
    ...(data.key && { key: data.key }),
  };

  return recipe;
}

export const loadRecipe = async function (id) {
  try {
    const data = await loadJSON(`${API_URL}${id}`);

    state.recipe = createRecipeObject(data.data.recipe);
    if (
      state.bookmarks.some((b) => {
        return b.id === id;
      })
    )
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.log(error);
  }
};

export async function loadResults(query) {
  try {
    const data = await loadJSON(`${API_URL}?search=${query}`);
    state.search.query = query;
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        imageUrl: rec.image_url,
        title: rec.title,
      };
    });
    state.search.currentPage = 1;
  } catch (error) {
    throw error;
  }
}

export function showCurrentPage(page) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}

export function updateServings(servings) {
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity / state.recipe.servings) * servings;
  });
  state.recipe.servings = servings;
}

function persistBookmarks() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

function getBookmarks() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
}
export function addBookmark(recipe) {
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);
  persistBookmarks();
}

export function removeBookmark(id) {
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  const index = state.bookmarks.findIndex((b) => b.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
}

export function bookmarksTab() {
  state.bookmarksOpen = !state.bookmarksOpen;
}

export async function uploadRecipe(newRecipe) {
  const ingreds = Object.entries(newRecipe)
    .filter((en) => en[0].startsWith("ingredient") && en[1] !== "")
    .map((ing) => {
      const [quantity, unit, description] = ing[1]
        .replaceAll(" ", "")
        .split(",");
      return { quantity: quantity ? +quantity : null, unit, description };
    });

  const recipe = {
    title: newRecipe.title,
    source_url: newRecipe.sourceUrl,
    image_url: newRecipe.image,
    publisher: newRecipe.publisher,
    cooking_time: +newRecipe.cookingTime,
    servings: +newRecipe.servings,
    ingreds,
  };
  console.log(recipe);

  const data = await sendJSON(`${API_URL}?key=${API_KEY}`, recipe);

  state.recipe = createRecipeObject(data.data.recipe);
  addBookmark(data.data.recipe);
}
getBookmarks();
