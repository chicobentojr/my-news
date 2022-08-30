<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
import NewsFilter from "../components/NewsFilter.vue";
export default {
  setup() {
    const store = useStore();
    const items = computed(() => store.state.favoriteNews);
    const filters = computed(
      () => new Set(store.state.favoriteNews.map((n) => n.source.name))
    );

    return { items, filters };
  },
  data() {
    return {
      newsSelected: null,
      filteredNews: this.items,
      checkedSources: [],
    };
  },
  methods: {
    handleNewsSelected: function (item) {
      this.newsSelected = item;
    },
    handleModalClose: function () {
      this.newsSelected = null;
    },
    handleFilterChange: function (filters) {
      this.filteredNews = this.items.filter(
        (a) => filters.length == 0 || filters.includes(a.source.name)
      );
    },
  },
  components: { NewsList, NewsModal, NewsFilter },
};
</script>

<template>
  <NewsFilter
    v-if="filteredNews.length > 0"
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
