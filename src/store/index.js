import { createStore } from "vuex";

const store = createStore({
  state: {
    favoriteNews: [],
    cachedNews: {},
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    addFavoriteNews(state, item) {
      state.favoriteNews.push(item);
    },
    removeFavoriteNews(state, item) {
      state.favoriteNews = state.favoriteNews.filter((n) => n.url !== item.url);
    },
    addNewsToCache(state, { key, content }) {
      state.cachedNews = {
        ...state.cachedNews,
        [key]: content,
      };
    },
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
