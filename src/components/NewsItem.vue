<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup(props) {
    const store = useStore();
    const isFavorite = computed(function () {
      return Boolean(
        store.state.favoriteNews.find((n) => n.url == props.item.url)
      );
    });

    return { isFavorite };
  },
  data(props) {
    const queryTerms = props.query?.split(" ") || [];
    const headline = queryTerms.reduce((acc, q) => {
      return acc.replace(new RegExp(q, "gi"), `<strong>${q}</strong>`);
    }, props.item.title);

    return {
      headline,
    };
  },
  methods: {
    itemSelected: function () {
      this.$emit("onItemSelected", this.item);
    },
  },
  props: {
    item: Object,
    query: String,
  },
};
</script>
<template>
  <div
    class="news-item"
    :class="{ 'primary--border': isFavorite }"
    @click="itemSelected"
  >
    <div class="news-item__title primary--color">
      {{ item.source.name }}: <span v-html="headline"></span>
    </div>
    <div class="news-item__description">
      {{ item.description }}
    </div>
  </div>
</template>

<style>
.news-item {
  margin: 1em;
  padding: 1em;
  border-width: 1px;
  border-style: solid;
  border-color: #ccc;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}
.news-item:hover {
  cursor: pointer;
  transform: scale(1.1);
}
.news-item__title {
  font-size: large;
}
.news-item__description {
  margin-top: 0.5em;
}
</style>
