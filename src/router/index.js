import { createRouter, createWebHistory } from "vue-router";

import FavoritesPage from "../pages/FavoritesPage.vue";
import IndexPage from "../pages/IndexPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/favorites",
      name: "favorites",
      component: FavoritesPage,
      // component: () => import("../pages/FavoritesPage.vue"),
    },
    {
      path: "/",
      name: "home",
      // component: IndexPage,
      component: IndexPage,
    },
  ],
});

export default router;
