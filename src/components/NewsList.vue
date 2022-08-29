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
  },
  components: { NewsItem },
};
</script>
<template>
  <div>
    <div v-for="item in items" :key="item.title">
      <NewsItem :item="item" @onItemSelected="handleItemSelected" />
    </div>
  </div>
</template>
