<script>
export default {
  data(props) {
    const queryTerms = props.query.split(" ");
    const headline = queryTerms.reduce((acc, q) => {
      return acc.replace(new RegExp(q, "gi"), `<strong>${q}</strong>`);
    }, props.item.title);

    return {
      headline,
      // isHover: false,
    };
  },
  mounted() {},
  methods: {
    itemSelected: function () {
      this.$emit("onItemSelected", this.item);
    },
    // onItemHover: function (enter) {
    //   this.isHover = enter;
    // console.log("hove", enter, this.item);
    // },
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
    <div class="title">
      {{ item.source.name }}: <span v-html="headline"></span>
    </div>
    <div class="description">
      {{ item.description }}
    </div>
    <!-- <div class="content">
      {{ item.content }}
    </div> -->
    <!-- <Transition name="news-content">
      <div v-if="isHover" class="content">
        {{ item.content }}
      </div>
    </Transition> -->
  </div>
</template>

<style>
.news-item {
  margin: 1em;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}
.news-item:hover {
  /* background-color: #00808050; */
  cursor: pointer;
  /* font-weight: bold; */
  transform: scale(1.1);
}
.news-item .title {
  font-size: large;
  color: #008080;
}
.news-item .description {
  /* color: #008080; */
  margin-top: 0.5em;
}

.news-item .content {
  margin-top: 0.5em;
  color: #555;
}
.news-item .content.bold {
  /* color: #008080; */
  font-weight: bold;
}
/* Content Transition */
.news-content-enter-active,
.news-content-leave-active {
  transition: opacity 0.2s ease;
}

.news-content-enter-from,
.news-content-leave-to {
  opacity: 0;
}
</style>
