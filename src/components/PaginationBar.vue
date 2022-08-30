<script>
export default {
  props: {
    currentPage: Number,
    totalPages: Number,
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
      this.$emit("onPageChange", pg);
    },
  },
};
</script>

<template>
  <div class="pagination">
    <span
      class="pagination__item pagination__item--previous primary--bg"
      :class="{ 'pagination__item--disabled': previousPageDisabled }"
      @click="!previousPageDisabled && onPageClick(currentPage - 1)"
    >
      {{ "<<" }} Previous
    </span>
    <span class="pagination__item primary--bg">
      {{ currentPage }} / {{ totalPages }}
    </span>
    <span
      class="pagination__item pagination__item--next primary--bg"
      :class="{ 'pagination__item--disabled': nextPageDisabled }"
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

.pagination__item {
  margin: 0 0.5em;
  padding: 0.5em;
  border-radius: 5px;
  user-select: none;
  border: none;
  color: white;
  opacity: 0.8;
}
.pagination__item--previous {
  float: left;
  cursor: pointer;
}
.pagination__item--next {
  float: right;
  cursor: pointer;
}

.pagination__item--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
