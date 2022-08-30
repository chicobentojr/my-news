<script>
import { debounce } from "lodash";

export default {
  data() {
    return {
      searchQuery: "Brazil",
    };
  },
  methods: {
    handleQueryChange: debounce(function () {
      this.$emit("onQuerySearch", this.searchQuery);
    }, 500),
  },
};
</script>

<template>
  <div class="search-bar" style="display: flex">
    <input
      class="search-bar input primary--color"
      style="flex: 1; padding: 1em"
      v-model="searchQuery"
      placeholder="What are you looking for?"
      @input="handleQueryChange"
    />
    <button
      class="search-bar search-bar__btn primary--bg"
      @click="handleQueryChange"
    >
      Search
    </button>
  </div>
</template>

<style>
.search-bar .input {
  font-size: large;
  font-weight: bold;
  border: 1px solid #ccc;
  border-radius: 10px 0 0 10px;
}
.search-bar .input:focus {
  outline: none;
  border: 1px solid #008080;
}

.search-bar__btn {
  font-size: large;
  outline: none;
  border: none;
  color: white;
  padding: 0 1em;
  border-radius: 0px 10px 10px 0px;
  cursor: pointer;
  opacity: 0.8;
}
.search-bar__btn:hover {
  opacity: 1;
}
</style>
