<script>
export default {
  props: {
    message: String,
    type: {
      type: String,
      default: "info",
    },
  },
};
</script>

<template>
  <div class="msg-container" :class="{ [`msg-container--${type}`]: type }">
    <p class="msg-container__text">
      {{ message }}
    </p>
  </div>
</template>

<style>
.msg-container {
  margin: 0.5em 0;
  border-width: 1px;
  border-style: solid;
}

.msg-container__text {
  margin: 1em;
}

.msg-container--info {
  border-color: #ccc;
}
.msg-container--error {
  background-color: #fdbdbd;
  border: #fdbdbd;
  color: #333;
}
.msg-container--warning {
  background-color: #f9eac3;
  border-color: #f9eac3;
  color: #333;
}
</style>
