<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <!-- TODO: Create app header component -->
  <header>
    <RouterLink to="/"><h3>My News</h3></RouterLink> |
    <RouterLink to="/favorites"><h3>Favorites</h3></RouterLink>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<!-- TODO: Refactor entire style page -->
<style>
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
