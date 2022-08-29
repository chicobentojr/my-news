<script>
import { useStore } from "vuex";
import PageRenderer from "./PageRenderer.vue";
export default {
  setup(props) {
    const store = useStore();
    const favoriteNews = function () {
      console.log("favoritar", props.item);
      store.commit("addFavoriteNews", props.item);
    };
    return {
      favoriteNews,
    };
  },
  methods: {
    closeModal: function () {
      console.log("fecha");
      this.$emit("onClose");
    },
  },
  props: {
    visible: Boolean,
    item: Object,
  },
  components: { PageRenderer },
};
</script>
<template>
  <Transition name="modal">
    <div v-if="visible" class="modal-mask" @click="closeModal">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <img class="news-header-img" :src="item.urlToImage" />
            <h3>{{ item.title }}</h3>
          </div>
          <!-- TODO: Add a close button -->
          <!-- <span class="btn-close">&times;</span> -->
          <div class="modal-content">
            <p>
              By: <strong>{{ item.author }}</strong> at
              {{ item.publishedAt }}
            </p>

            <a :href="item.url" target="_blank">Open news</a>

            <!-- <p>{{ item.description }}</p> -->

            <!-- <p>{{ item.content }}</p> -->
            <!-- TODO: Add iframe to display entire report??? -->
          </div>

          <button @click.stop="favoriteNews">Favorite</button>
          <div class="modal-footer"></div>
          <div>
            <PageRenderer :url="item.url" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.1s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 960px;
  z-index: 9999;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.1s ease;
  max-height: calc(100vh - 210px);
  overflow-y: auto;
}

.modal-header h3 {
  margin: 1em 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.news-header-img {
  text-align: center;
  max-width: 900px;
  margin: 0.5em auto;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
