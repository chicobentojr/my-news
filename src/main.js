import "semantic-ui-css/semantic.min.css";

import * as SuiVue from "semantic-ui-vue";
import * as Vue from "vue";

import App from "./App.vue";

let app = Vue.createApp(App);

app.use(SuiVue);

app.mount("#app");
