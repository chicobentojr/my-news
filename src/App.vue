<script>
import NewsList from "./components/NewsList.vue";
import NewsModal from "./components/NewsModal.vue";
export default {
  components: { NewsList, NewsModal },
  data() {
    return {
      newsSelected: null,
      allNews: [],
      filteredNews: [],
      filters: {
        sources: [],
      },
      checkedSources: [],
      searchQuery: "bitcoin",
    };
  },
  watch: {
    checkedSources(newValues) {
      this.filteredNews = this.allNews.filter(
        (a) => newValues.length == 0 || newValues.includes(a.source.name)
      );
    },
  },
  methods: {
    handleModalClose: function () {
      this.newsSelected = null
    },
    handleNewsSelected: function (item) {
      console.log("app", { ...item });
      this.newsSelected = item;
    },
    fetchNews: function () {
      if (this.searchQuery) {
        console.log("fetching ....", this.searchQuery);

        fetch(
          "https://newsapi.org/v2/everything?" +
          new URLSearchParams({
            q: this.searchQuery,
            apiKey: import.meta.env.VITE_NEWS_API_KEY,
          })
        ).then((response) => {
          response.json().then((data) => {
            console.log({ data });
            this.allNews = data.articles;
            this.filteredNews = this.allNews;

            const sources = new Set(data.articles.map((a) => a.source.name));

            this.filters.sources = sources;
            this.checkedSources = []
          });
        });
      }
    },
  },
  mounted() {
    // TODO: Set API host as Env variable
    this.fetchNews();
  },
};
</script>

<template>
  <!-- TODO: Create NewsContainer component to group children components -->
  <header>
    <div>
      <h3>My News</h3>
      <!-- TODO: Create component to search bar  -->
      <div style="display: flex">
        <input style="flex: 1; padding: 1em" v-model="searchQuery" placeholder="What are you looking for?" />
        <button @click="fetchNews">Search</button>
      </div>
      <div></div>
      <!-- TODO: Create component to manipulate filters -->
      <div class="header-filters">
        <strong>Source:</strong>
        <div class="filter" style="margin: 0.5em" v-for="source in filters.sources" :key="source">
          <input class="filter-checkbox" :id="source" :value="source" name="source" type="checkbox"
            v-model="checkedSources" />
          <label class="filter-label" :for="source">{{ source }}</label>
        </div>
      </div>
    </div>
  </header>

  <main>
    <NewsModal :visible="newsSelected != null" :item="newsSelected" @onClose="handleModalClose" />

    <div class="news-content">
      <NewsList style="flex: 1" @onNewsSelected="handleNewsSelected" :items="filteredNews" />

      <!-- TODO: Create component to display selected news -->
      <!-- <div v-if="newsSelected" style="flex: 1">
        <div style="background: #ccc; margin: 1em">
          <img class="news-header-img" :src="newsSelected.urlToImage" />
          <h3>{{ newsSelected.title }}</h3>
          <p>
            By: <strong>{{ newsSelected.author }}</strong> at
            {{ newsSelected.publishedAt }}
          </p>

          <p>{{ newsSelected.description }}</p>

          <p>{{ newsSelected.content }}</p>

          <PageRenderer :url="newsSelected.url" />
        </div>
      </div> -->
    </div>
  </main>
</template>

<style scoped>
* {
  font-size: 1.05em;
}

header {
  margin: 1em auto;
  max-width: 1260px;

}

.header-filters {
  /* display: flex; */
  /* align-items: center; */
}

.header-filters .filter {
  /* display: flex; */
  /* align-items: center; */
  display: inline-block;
  cursor: pointer;
}

.header-filters .filter .filter-checkbox {
  margin: 0 5px;
}

.header-filters .filter .filter-label {
  cursor: pointer;
}

main {
  max-width: 1024px;
  margin: 0 auto;
}

.news-content {
  display: flex;
}

.news-header-img {
  text-align: center;
  height: 20em;
}
</style>
