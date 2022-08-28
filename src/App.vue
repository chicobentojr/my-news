<script>
import NewsList from "./components/NewsList.vue";
export default {
  data() {
    return {
      newsSelected: null
    }
  },
  methods: {
    handleNewsSelected: function (item) {
      console.log("app", { item })
      this.newsSelected = item
      console.log(this)
    }
  },
  components: { NewsList }
}

</script>

<template>
  <header>
    <div>
      <h1 is="sui-header">Pesquise</h1>
      <!-- TODO: Add form to search news -->
    </div>
  </header>

  <main>
    <div class="news-content">
      <NewsList style="flex:1" @onNewsSelected="handleNewsSelected" />
      <!-- TODO: Create component to display selected news -->
      <div v-if="newsSelected" style="background: #ccc; flex: 1">
        noticia selecionada
        {{ newsSelected }}
      </div>
    </div>
  </main>
</template>

<style scoped>
.news-content {
  display: flex;

}
</style>
