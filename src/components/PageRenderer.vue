<script>
import { Readability } from "@mozilla/readability";
import { computed } from "vue";
import { useStore } from "vuex";
import Loader from "./LoaderItem.vue";
export default {
  setup(props) {
    const store = useStore();
    const cachedArticle = computed(function () {
      if (!(props.item.url in store.state.cachedNews)) return null;

      return store.state.cachedNews[props.item.url];
    });
    const addNewsToCache = function (article) {
      store.commit("addNewsToCache", {
        key: props.item.url,
        content: article,
      });
    };
    return {
      cachedArticle,
      addNewsToCache,
    };
  },
  mounted() {
    if (!this.cachedArticle) {
      fetch(this.item.url).then((response) => {
        response.text().then((text) => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(text, "text/html");
          var article = new Readability(doc).parse();
          this.addNewsToCache(article.textContent);
        });
      });
    }
  },
  props: {
    item: Object,
  },
  components: { Loader },
};
</script>
<template>
  <Loader v-if="!cachedArticle" />
  <div v-if="cachedArticle">
    {{ cachedArticle }}
  </div>
</template>
