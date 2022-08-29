<script>
export default {
  data() {
    return {
      // items: []
    };
  },
  mounted() {},
  methods: {
    itemSelected: function () {
      this.$emit("onItemSelected", this.item);
    },
  },
  props: {
    // TODO: Define item structure
    item: Object,
  },
};
</script>
<template>
  <div class="news-item" @click="itemSelected">
    {{ item.source.name }}: {{ item.title }}
  </div>
</template>

<style>
.news-item {
  margin: 1em;
  padding: 1em;
  border: 1px solid black;
}
</style>
