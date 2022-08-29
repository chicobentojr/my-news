<script>
import { Readability } from "@mozilla/readability";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup(props) {
    const store = useStore();
    // console.log("state", { ...store.state });

    const cachedArticle = computed(function () {
      return store.state.cachedNews.hasOwnProperty(props.url)
        ? store.state.cachedNews[props.url]
        : null;
    });

    // console.log({ cachedArticle });

    const addNewsToCache = function (article) {
      console.log("addNewsToCache", { url: props.url, article });
      store.commit("addNewsToCache", {
        key: props.url,
        content: article,
      });
    };

    // const cachedArticle = function () {
    return {
      cachedArticle,
      addNewsToCache,
    };
  },
  // computed: {
  //   cachedArticle() {
  //     const store = useStore();
  //     return store.state.cachedNews.hasOwnProperty(this.url)
  //       ? store.state.cachedNews[this.url]
  //       : null;
  //   },
  // },
  // data() {
  //   return {
  //     newsContent: "",
  //   };
  // },
  mounted() {
    // console.log("render", this.url);
    if (!this.cachedArticle) {
      console.log("fazer o fetch");
      fetch(this.url).then((response) => {
        // console.log(response);
        response.text().then((text) => {
          var parser = new DOMParser();
          var doc = parser.parseFromString(text, "text/html");

          // console.log({ doc });

          var article = new Readability(doc).parse();

          // console.log({ article });

          // this.newsContent = article.textContent;
          this.addNewsToCache(article.textContent);
        });
      });
    } else {
      console.log("bateu no cache");
    }
  },
  props: {
    url: String,
  },
};
</script>
<template>
  <div v-if="!cachedArticle">
    <h1>Loading</h1>
  </div>

  <div v-if="cachedArticle">
    {{ cachedArticle }}
  </div>
</template>
