import { createStore } from "vuex";

// TODO: Create constants to mutations

const store = createStore({
  state: {
    // products: [],
    // cart: [],
    favoriteNews: [],
    cachedNews: {},
  },
  mutations: {
    initialiseStore(state) {
      // Check if the ID exists
      if (localStorage.getItem("store")) {
        // Replace the state object with the stored item
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
    // addCartItem(state, item) {
    //   item.quantity = 1;
    //   state.cart.push(item);
    // },
    // updateCartItem(state, updatedItem) {
    //   state.cart = state.cart.map((cartItem) => {
    //     if (cartItem.id == updatedItem.id) {
    //       return updatedItem;
    //     }

    //     return cartItem;
    //   });
    // },
    // removeCartItem(state, item) {
    //   state.cart = state.cart.filter((cartItem) => {
    //     return cartItem.id != item.id;
    //   });
    // },
  },
});

// TODO: Save entire store in localStorage to persist after reload page
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

export default store;
