// TODO: change this import to use just Semantic UI font
// import "semantic-ui-css/semantic.min.css";

import * as Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = Vue.createApp({
  render: () => Vue.h(App),
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});

app.use(router);
app.use(store);

app.mount("#app");
