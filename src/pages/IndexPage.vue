<script>
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import Loader from "../components/LoaderItem.vue";
import NewsFilter from "../components/NewsFilter.vue";
import PaginationBar from "../components/PaginationBar.vue";
import { NEWS_API_HOST, NEWS_API_KEY } from "../utils/constants";
import InfoMessage from "../components/InfoMessage.vue";
import SearchBar from "../components/SearchBar.vue";
export default {
  components: {
    NewsList,
    NewsModal,
    Loader,
    NewsFilter,
    PaginationBar,
    InfoMessage,
    SearchBar,
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
      pageSize: 10,
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
              pageSize: this.pageSize,
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
                this.totalPages = Math.ceil(data.totalResults / this.pageSize);
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
    handleQuerySearch: function (query) {
      this.searchQuery = query;
      this.currentPage = 1;
      this.fetchNews();
    },
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
    <SearchBar @onQuerySearch="handleQuerySearch" />
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
.news-content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%;
}
</style>
