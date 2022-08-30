<script>
import NewsItem from "./NewsItem.vue";
export default {
  methods: {
    handleItemSelected: function (item) {
      this.$emit("onNewsSelected", item);
    },
  },
  props: {
    items: [Object],
    query: String,
  },
  components: { NewsItem },
};
</script>
<template>
  <div v-if="items.length > 0">
    <div v-for="item in items" :key="item.title + item.publishedAt">
      <NewsItem
        :item="item"
        :query="query"
        @onItemSelected="handleItemSelected"
      />
    </div>
  </div>
  <div v-else class="empty-container">
    <h3 class="empty-container__msg">No record found :(</h3>
  </div>
</template>

<style>
.empty-container {
  border: 1px solid #ccc;
  text-align: center;
  padding: 1em;
}
.empty-container__msg {
  font-weight: lighter;
  color: #555;
}
</style>
