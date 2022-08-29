<script>
export default {
  data(props) {
    const queryTerms = props.query.split(" ");
    const headline = queryTerms.reduce((acc, q) => {
      return acc.replace(new RegExp(q, "gi"), `<strong>${q}</strong>`);
    }, props.item.title);

    return {
      headline,
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
    query: String,
  },
};
</script>
<template>
  <div class="news-item" @click="itemSelected">
    <!-- {{ item.source.name }}: {{ item.title }} -->
    {{ item.source.name }}: <span v-html="headline"></span>
  </div>
</template>

<style>
.news-item {
  margin: 1em;
  padding: 1em;
  border: 1px solid black;
}
</style>
