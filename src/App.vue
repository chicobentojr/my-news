<script>
import NewsList from "./components/NewsList.vue";
export default {
  components: { NewsList },
  data() {
    return {
      newsSelected: null,
      allNews: [],
      filteredNews: [],
      filters: {
        sources: []
      },
      checkedSources: [],
      searchQuery: "bitcoin"
    }
  },
  watch: {
    checkedSources(newValues, oldValues) {
      console.log({ newValues, oldValues })
      this.filteredNews = this.allNews.filter(a => newValues.length == 0 || newValues.includes(a.source.name))
    }
  },
  methods: {
    handleNewsSelected: function (item) {
      console.log("app", { ...item })
      this.newsSelected = item
    },
    fetchNews: function () {
      if (this.searchQuery) {
        console.log("fetching ....", this.searchQuery)
        fetch("https://newsapi.org/v2/everything?" + new URLSearchParams({
          q: this.searchQuery,
          apiKey: import.meta.env.VITE_NEWS_API_KEY
        }))
          .then((response) => {
            response.json().then(data => {
              console.log({ data });
              this.allNews = data.articles;
              this.filteredNews = this.allNews;

              const sources = new Set(data.articles.map(a => a.source.name))

              this.filters.sources = sources
            });
          });
      }
    }
  },
  mounted() {
    // TODO: Set API host as Env variable
    this.fetchNews()
  },
}

</script>

<template>
  <header>
    <div>
      <!-- TODO: Add form to search news -->
      <!-- <h1 is="sui-header">Pesquise</h1> -->
    </div>
    <div>
      <h3>Notícias da atualidade</h3>
      <!-- TODO: Create component to search bar  -->
      <div style=" display: flex; ">
        <input style="flex: 1; padding: 1em;" v-model="searchQuery" placeholder="What are you looking for?" />
        <button @click="fetchNews">Search</button>
      </div>
      <div>

      </div>
      <!-- TODO: Create component to manipulate filters -->
      <div class="header-filters">
        Fonte:
        <div style="margin: 0.5em" v-for="source in filters.sources">
          <input :id="source" :value="source" name="source" type="checkbox" v-model="checkedSources" />
          <label :for="source">{{ source }}</label>
        </div>
      </div>
    </div>
  </header>

  <main>
    <div class="news-content">
      <NewsList style="flex:1" @onNewsSelected="handleNewsSelected" :items="filteredNews" />


      <!-- TODO: Create component to display selected news -->
      <div v-if="newsSelected" style="flex: 1">
        <div style="background: #ccc; margin: 1em">

          <!-- <h3>
            Selected News:
          </h3> -->
          <img class="news-header-img" :src="newsSelected.urlToImage" />
          <h3> {{ newsSelected.title }}</h3>
          <p>By: <strong>{{ newsSelected.author }}</strong> at {{ newsSelected.publishedAt }}</p>

          <p>{{ newsSelected.description }}</p>

          <p>{{ newsSelected.content }}</p>


        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
header {
  margin: 1em;
}

.news-content {
  display: flex;

}

.news-header-img {
  text-align: center;
  height: 20em;
}

.header-filters {
  display: flex;
  align-items: center;
}
</style>
