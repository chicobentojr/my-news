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
  <!-- TODO: Create app header component -->
  <header>
    <RouterLink to="/"><h3>My News</h3></RouterLink> |
    <RouterLink to="/favorites"
      ><h3>Favorites {{ count ? `(${count})` : null }}</h3></RouterLink
    >
  </header>

  <main>
    <RouterView />
  </main>
</template>

<!-- TODO: Refactor entire style page -->
<style>
* {
  font-size: 1.02em;
}
header {
  margin: 1em auto;
  max-width: 1260px;
}
header > a {
  display: inline-block;
}

main {
  max-width: 1260px;
  margin: 0 auto;
}
</style>
