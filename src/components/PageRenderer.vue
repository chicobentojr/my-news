<script>
import { Readability } from "@mozilla/readability";
export default {
  data() {
    return {
      newsContent: "",
    };
  },
  mounted() {
    // console.log("render", this.url);
    fetch(this.url).then((response) => {
      console.log(response);
      response.text().then((text) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, "text/html");

        console.log({ doc });

        var article = new Readability(doc).parse();

        console.log({ article });

        this.newsContent = article.textContent;
      });
    });
  },
  props: {
    url: String,
  },
};
</script>
<template>
  <!-- <div>Loading ...</div> -->
  {{ newsContent }}
  <!-- <iframe :src="url"></iframe> -->
</template>
