<script setup>
import { RouterView } from "vue-router";
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const count = computed(function () {
  return store.state.favoriteNews.length;
});
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="header__link">
      <h3>My News</h3>
    </RouterLink>
    |
    <RouterLink to="/favorites" class="header__link">
      <h3>Favorites {{ count ? `(${count})` : null }}</h3>
    </RouterLink>
  </header>

  <main class="main">
    <RouterView />
  </main>
</template>

<style>
html {
  font-family: Lato, "Helvetica Neue", Arial, Helvetica, sans-serif;
}
.header {
  margin: 1em auto;
  max-width: 1260px;
}
.header__link {
  display: inline-block;
  color: #008080;
}

.main {
  max-width: 1260px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
</style>
