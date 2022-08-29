<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import NewsFilter from "../components/NewsFilter.vue";
export default {
  setup() {
    const store = useStore();
    const items = computed(function () {
      return store.state.favoriteNews;
    });

    const filters = computed(function () {
      const a = new Set(store.state.favoriteNews.map((n) => n.source.name));
      console.log({ a });
      return a;
    });
    console.log({ ...items });
    console.log("favitems", store.state.favoriteNews);
    return {
      items,
      filters,
    };
  },
  data() {
    return {
      newsSelected: null,
      filteredNews: this.items,
      // filters: {
      //   sources: [],
      // },
      checkedSources: [],
    };
  },
  methods: {
    handleNewsSelected: function (item) {
      console.log("fav", { ...item });
      this.newsSelected = item;
    },
    handleModalClose: function () {
      this.newsSelected = null;
    },
    handleFilterChange: function (filters) {
      console.log({ filters });
      this.filteredNews = this.items.filter(
        (a) => filters.length == 0 || filters.includes(a.source.name)
      );
    },
  },
  components: { NewsList, NewsModal, NewsFilter },
};
</script>

<template>
  <!-- <div>Favorite News</div> -->
  <NewsFilter
    label="Source"
    :filters="filters"
    @onFiltersChange="handleFilterChange"
  />
  <NewsModal
    :visible="newsSelected != null"
    :item="newsSelected"
    @onClose="handleModalClose"
  />
  <NewsList @onNewsSelected="handleNewsSelected" :items="filteredNews" />
</template>
