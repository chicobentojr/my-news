<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsList from "../components/NewsList.vue";
import NewsModal from "../components/NewsModal.vue";
export default {
  setup() {
    const store = useStore();
    const items = computed(() => store.state.favoriteNews);
    return { items };
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
      this.$emit("onFiltersChange", newValues);
    },
  },
  methods: {
    handleNewsSelected: function (item) {
      this.newsSelected = item;
    },
    handleModalClose: function () {
      this.newsSelected = null;
    },
  },
  props: {
    label: String,
    filters: Set,
  },
  components: { NewsList, NewsModal },
};
</script>

<template>
  <div v-if="filters">
    <strong>{{ label }}:</strong>
    <div
      class="header__filter"
      style="margin: 0.5em"
      v-for="source in filters"
      :key="source"
    >
      <input
        class="filter__checkbox"
        :id="source"
        :value="source"
        name="source"
        type="checkbox"
        v-model="checkedFilters"
      />
      <label class="filter__label" :for="source">{{ source }}</label>
    </div>
  </div>
</template>

<style scoped>
.header__filter {
  display: inline-block;
  cursor: pointer;
}
.header__filter:hover {
  font-weight: bold;
}

.filter__checkbox {
  margin: 0 5px;
  accent-color: #008080;
}

.filter__label {
  cursor: pointer;
}
</style>
