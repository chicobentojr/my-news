<script>
import { Readability } from "@mozilla/readability";
import { computed } from "vue";
import { useStore } from "vuex";
import Loader from "./Loader.vue";
export default {
  setup(props) {
    const store = useStore();
    console.log("render", props.item);
    const cachedArticle = computed(function () {
      if (!store.state.cachedNews.hasOwnProperty(props.item.url)) return null;

      const content = store.state.cachedNews[props.item.url];

      // console.log(content.slice(0, 2000));

      // const p = content
      //   .slice(0, 2000)
      //   .split(".")
      //   .reduce(
      //     ([list, paragraph], curr, index) => {
      //       console.log({ list, paragraph, curr, index });
      //       if (index % 2) {
      //         return [[...list, paragraph], ""];
      //       } else {
      //         return [[...list], paragraph + "." + curr];
      //       }
      //     },
      //     [[], ""]
      //   );

      // console.log({ p });

      return content;
    });
    // console.log({ cachedArticle });
    const addNewsToCache = function (article) {
      console.log("addNewsToCache", { url: props.item.url, article });
      store.commit("addNewsToCache", {
        key: props.item.url,
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
      fetch(this.item.url).then((response) => {
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
