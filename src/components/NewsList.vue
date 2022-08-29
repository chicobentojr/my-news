<script>
import NewsItem from "./NewsItem.vue";
export default {
  methods: {
    handleItemSelected: function (item) {
      console.log("on item");
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
  <div>
    <div v-for="item in items" :key="item.title + item.publishedAt">
      <NewsItem
        :item="item"
        :query="query"
        @onItemSelected="handleItemSelected"
      />
    </div>
  </div>
</template>
