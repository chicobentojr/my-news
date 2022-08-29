// TODO: change this import to use just Semantic UI font
import "semantic-ui-css/semantic.min.css";

import * as Vue from "vue";
import * as VueRouter from "vue-router";

import App from "./App.vue";
import FavoritesPage from "./pages/FavoritesPage.vue";
import IndexPage from "./pages/IndexPage.vue";
import router from "./router";

const app = Vue.createApp(App);

app.use(router);

app.mount("#app");
