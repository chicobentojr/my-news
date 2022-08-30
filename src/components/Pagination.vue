<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
  },
  data() {
    return {
      displayPages: 5,
    };
  },
  computed: {
    previousPageDisabled: function () {
      return this.currentPage - 1 <= 0;
    },
    nextPageDisabled: function () {
      return this.currentPage + 1 > this.totalPages;
    },
  },
  methods: {
    onPageClick(pg) {
      //   this.currentPage = Math.max(Math.min(pg, this.totalPages), 1);
      this.$emit("onPageChange", pg);

      //   const pages = [...Array(this.displayPages).keys()].map(
      //     (p) => p + this.currentPage
      //   );
      //   console.log(pages);
      //   this.pages = pages;
    },
  },
};
</script>

<template>
  <div class="pagination">
    <span
      class="page-item previous"
      :class="{ disabled: previousPageDisabled }"
      @click="!previousPageDisabled && onPageClick(currentPage - 1)"
    >
      {{ "<<" }} Previous
    </span>
    <span class="page-item"> {{ currentPage }} / {{ totalPages }} </span>
    <!-- {{ pg + 1 }} -->
    <!-- <a v-for="pg in pages" :key="pg" class="page-item" @click="onPageClick(pg)">
      {{ currentPage }}
    </a> -->

    <span
      class="page-item next"
      :class="{ disabled: nextPageDisabled }"
      @click="!nextPageDisabled && onPageClick(currentPage + 1)"
    >
      Next {{ ">>" }}
    </span>
  </div>
</template>

<style>
.pagination {
  margin: 0.5em 0;
  display: flex;
  justify-content: space-between;
}

.page-item {
  margin: 0 0.5em;
  cursor: pointer;

  background: #eee;
  padding: 0.5em;
  border-radius: 5px;
  user-select: none;
}
.page-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.page-item .previous {
  float: left;
}
.page-item .next {
  float: right;
}
</style>
