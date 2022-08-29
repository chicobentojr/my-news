<script>
import { computed } from "vue";
import { useStore } from "vuex";
import NewsList from "../components/NewsList.vue";
export default {
  // components: {
  //   Product,
  //   Cart,
  // },
  setup() {
    const store = useStore();
    const items = computed(function () {
      return store.state.favoriteNews;
    });
    // let cart = computed(function () {
    //   return store.state.cart;
    // });
    console.log({ ...items });
    console.log("favitems", store.state.favoriteNews);
    return {
      items,
    };
  },
  methods: {
    handleNewsSelected: function (item) {
      console.log("fav", { ...item });
    },
  },
  components: { NewsList },
};
</script>

<template>
  <div>Favorite News</div>
  <NewsList @onNewsSelected="handleNewsSelected" :items="items" />
</template>
