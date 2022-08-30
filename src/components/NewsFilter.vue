<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
export default {
  setup() {
    const store = useStore();
    const items = computed(function () {
      return store.state.favoriteNews;
    });
    console.log({ ...items });
    console.log("favitems", store.state.favoriteNews);
    return {
      items,
      //   filters: new Set(items.map((n) => n.source.name)),
    };
  },
  data() {
    return {
      newsSelected: null,
      filteredNews: [],
      checkedFilters: [],
    };
  },
  watch: {
    checkedFilters(newValues) {
      //   this.filteredNews = this.allNews.filter(
      //     (a) => newValues.length == 0 || newValues.includes(a.source.name)
      //   );
      console.log({ newValues });
      this.$emit("onFiltersChange", newValues);
    },
  },
  methods: {
    handleNewsSelected: function (item) {
      console.log("fav", { ...item });
      this.newsSelected = item;
    },
    handleModalClose: function () {
      this.newsSelected = null;
    },
  },
  props: {
    label: String,
    filters: [String],
  },
  components: { NewsList, NewsModal },
};
</script>

<template>
  <div class="header-filters" v-if="filters">
    <!-- {{ filters }} -->
    <strong>{{ label }}:</strong>
    <div
      class="filter"
      style="margin: 0.5em"
      v-for="source in filters"
      :key="source"
    >
      <input
        class="filter-checkbox"
        :id="source"
        :value="source"
        name="source"
        type="checkbox"
        v-model="checkedFilters"
      />
      <label class="filter-label" :for="source">{{ source }}</label>
    </div>
  </div>
</template>

<style>
.header-filters .filter {
  display: inline-block;
  cursor: pointer;
}

.header-filters .filter:hover {
  font-weight: bold;
}

.header-filters .filter .filter-checkbox {
  margin: 0 5px;
  accent-color: #008080;
}

.header-filters .filter .filter-label {
  cursor: pointer;
}
</style>
