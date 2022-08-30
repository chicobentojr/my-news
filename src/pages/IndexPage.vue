<script>
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import Loader from "../components/LoaderItem.vue";
import { debounce } from "lodash";
import NewsFilter from "../components/NewsFilter.vue";
import PaginationBar from "../components/PaginationBar.vue";
import { NEWS_API_HOST, NEWS_API_KEY } from "../utils/constants";
import InfoMessage from "../components/InfoMessage.vue";
export default {
  components: {
    NewsList,
    NewsModal,
    Loader,
    NewsFilter,
    PaginationBar,
    InfoMessage,
  },
  setup() {
    return {
      isDemoApi: !NEWS_API_HOST.includes("newsapi.org"),
    };
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
      serverError: null,
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
          NEWS_API_HOST +
            "?" +
            new URLSearchParams({
              q: this.searchQuery,
              apiKey: NEWS_API_KEY,
              page: this.currentPage,
              pageSize: 100,
            })
        )
          .then((response) => {
            return response
              .json()
              .then((data) => {
                if (data.status == "error") {
                  throw data;
                }

                this.allNews = data.articles;
                this.filteredNews = this.allNews;

                const sources = new Set(
                  data.articles.map((a) => a.source.name)
                );

                this.sources = sources;
                this.checkedSources = [];
                this.totalPages = Math.ceil(data.totalResults / 100);
                this.loadingNews = false;
              })
              .catch((error) => {
                this.sources = [];
                this.loadingNews = false;
                this.filteredNews = [];
                this.serverError = error.message;
              });
          })
          .catch((error) => {
            console.error(error);
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
    <InfoMessage
      v-if="isDemoApi"
      message="This interface is not using original News API due free plan limitations. So all results are the same. 
      Open https://github.com/chicobentojr/my-news to run project locally."
      type="warning"
    />
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
    <PaginationBar
      v-if="filteredNews.length > 0"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @onPageChange="handlePageChange"
    />
    <InfoMessage v-if="serverError" :message="serverError" type="error" />

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
</style>
