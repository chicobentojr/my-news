<script>
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import { RouterLink } from "vue-router";
import Pagination from "../components/Pagination.vue";
import Loader from "../components/Loader.vue";
import { debounce } from "lodash";
import NewsFilter from "../components/NewsFilter.vue";
export default {
  components: {
    NewsList,
    NewsModal,
    RouterLink,
    Pagination,
    Loader,
    NewsFilter,
  },
  data() {
    return {
      newsSelected: null,
      allNews: [],
      filteredNews: [],
      sources: [],
      checkedSources: [],
      searchQuery: "Brazil",
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
          import.meta.env.VITE_NEWS_API_HOST +
            "?" +
            new URLSearchParams({
              q: this.searchQuery,
              apiKey: import.meta.env.VITE_NEWS_API_KEY,
              page: this.currentPage,
              pageSize: 100,
            })
        ).then((response) => {
          return response
            .json()
            .then((data) => {
              this.allNews = data.articles;
              this.filteredNews = this.allNews;

              const sources = new Set(data.articles.map((a) => a.source.name));

              this.sources = sources;
              this.checkedSources = [];
              this.totalPages = Math.ceil(data.totalResults / 100);
              this.loadingNews = false;
            })
            .catch((error) => {
              this.sources = [];
              this.loadingNews = false;
              this.filteredNews = [];
              // TODO: Add error msg
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
      this.newsSelected = item;
    },
    handlePageChange: function (newPage) {
      this.currentPage = newPage;
      this.fetchNews();
    },
    handleFilterChange: function (filters) {
      this.filteredNews = this.allNews.filter(
        (a) => filters.length == 0 || filters.includes(a.source.name)
      );
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<template>
  <div class="page-header">
    <!-- TODO: Create component to search bar  -->
    <div class="search-bar" style="display: flex">
      <input
        class="search-bar input primary--color"
        style="flex: 1; padding: 1em"
        v-model="searchQuery"
        placeholder="What are you looking for?"
        @input="handleQueryChange"
      />
      <button class="search-bar btn-search" @click="fetchNews">Search</button>
    </div>
    <div></div>
    <NewsFilter
      v-if="sources.size > 0"
      label="Source"
      :filters="sources"
      @onFiltersChange="handleFilterChange"
    />
  </div>

  <Loader v-if="loadingNews" />
  <div v-else class="news-content">
    <NewsModal
      :visible="newsSelected != null"
      :item="newsSelected"
      @onClose="handleModalClose"
    />
    <Pagination
      v-if="filteredNews.length > 0"
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

.search-bar .input {
  font-size: large;
  /* color: #008080; */
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 10px 0 0 10px;
}
.search-bar .input:focus {
  outline: none;
  border: 1px solid #008080;
}

.search-bar .btn-search {
  font-size: large;
  outline: none;
  border: none;
  color: white;
  background-color: #008080;
  padding: 0 1em;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  opacity: 0.8;
}
.search-bar .btn-search:hover {
  opacity: 1;
}

.news-content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
}

.news-header-img {
  text-align: center;
  height: 20em;
}
</style>
