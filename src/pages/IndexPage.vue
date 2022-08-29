<script>
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import { RouterLink } from "vue-router";
import Pagination from "../components/Pagination.vue";
import Loader from "../components/Loader.vue";
import { debounce } from "lodash";
export default {
  components: { NewsList, NewsModal, RouterLink, Pagination, Loader },
  data() {
    return {
      newsSelected: null,
      allNews: [],
      filteredNews: [],
      filters: {
        sources: [],
      },
      checkedSources: [],
      // searchQuery: "Brazil",
      searchQuery: "bitcoin",
      currentPage: 1,
      totalPages: 1,
      loadingNews: true,
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
    fetchNews: function () {
      if (this.searchQuery) {
        this.loadingNews = true;
        fetch(
          // "https://newsapi.org/v2/everything?" +
          //   new URLSearchParams({
          //     q: this.searchQuery,
          //     apiKey: import.meta.env.VITE_NEWS_API_KEY,
          //     page: this.currentPage,
          //     pageSize: 10,
          //   })
          "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
        ).then((response) => {
          response.json().then((data) => {
            console.log(this.searchQuery, { data });
            this.allNews = data.articles;
            this.filteredNews = this.allNews;

            const sources = new Set(data.articles.map((a) => a.source.name));

            this.filters.sources = sources;
            this.checkedSources = [];
            this.totalPages = Math.ceil(data.totalResults / 100);
            this.loadingNews = false;
          });
        });
      }
    },
    handleQueryChange: debounce(function () {
      this.fetchNews();
    }, 500),
    handleModalClose: function () {
      this.newsSelected = null;
    },
    handleNewsSelected: function (item) {
      // console.log("app", { ...item });
      this.newsSelected = item;
    },
    handlePageChange: function (newPage) {
      console.log({ newPage });
      this.currentPage = newPage;
      this.fetchNews();
    },
  },
  mounted() {
    // TODO: Set API host as Env variable
    // console.log(this.$router.params);
    this.fetchNews();
  },
};
</script>

<template>
  <!-- TODO: Create NewsContainer component to group children components -->
  <div class="page-header">
    <!-- TODO: Create component to search bar  -->
    <div style="display: flex">
      <input
        style="flex: 1; padding: 1em"
        v-model="searchQuery"
        placeholder="What are you looking for?"
        @input="handleQueryChange"
      />
      <button @click="fetchNews">Search</button>
    </div>
    <div></div>
    <!-- TODO: Create component to manipulate filters -->
    <div class="header-filters">
      <strong>Source:</strong>
      <div
        class="filter"
        style="margin: 0.5em"
        v-for="source in filters.sources"
        :key="source"
      >
        <input
          class="filter-checkbox"
          :id="source"
          :value="source"
          name="source"
          type="checkbox"
          v-model="checkedSources"
        />
        <label class="filter-label" :for="source">{{ source }}</label>
      </div>
    </div>
  </div>

  <Loader v-if="loadingNews" />
  <div v-else class="news-content">
    <NewsModal
      :visible="newsSelected != null"
      :item="newsSelected"
      @onClose="handleModalClose"
    />
    <Pagination
      :currentPage="currentPage"
      :totalPages="totalPages"
      @onPageChange="handlePageChange"
    />
    <div>
      <NewsList
        style="flex: 1"
        @onNewsSelected="handleNewsSelected"
        :items="filteredNews"
        :query="searchQuery"
      />
    </div>
  </div>
</template>

<style scoped>
.page-header {
  /* max-width: 1260px; */
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

.news-content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1024px;
}

.news-header-img {
  text-align: center;
  height: 20em;
}
</style>
