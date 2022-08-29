<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PageRenderer from "./PageRenderer.vue";
export default {
  setup(props) {
    const store = useStore();

    const isFavorite = computed(function () {
      return Boolean(
        store.state.favoriteNews.find((n) => n.url == props.item.url)
      );
    });

    const favoriteNews = function () {
      if (this.isFavorite) {
        store.commit("removeFavoriteNews", props.item);
      } else {
        store.commit("addFavoriteNews", props.item);
      }
    };
    return {
      favoriteNews,
      isFavorite,
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
            <div>
              <h3 class="modal-header title">{{ item.title }}</h3>
              <span>
                By: <strong>{{ item.author || "Anonymous" }}</strong> at
                <!-- TODO: Format time -->
                {{ item.publishedAt }}
              </span>
            </div>
            <div class="modal-actions">
              <button
                class="modal-header favorite-btn"
                :class="{ favorited: isFavorite }"
                @click.stop="favoriteNews"
              >
                {{ isFavorite ? "Favorited" : "Favorite" }}
              </button>
              <a
                class="modal-header news-source-link"
                :href="item.url"
                target="_blank"
                >Open source ↗</a
              >
            </div>
          </div>
          <!-- TODO: Add a close button -->
          <!-- <span class="btn-close">&times;</span> -->
          <div class="modal-body">
            <img class="modal-header-img" :src="item.urlToImage" />
            <PageRenderer :item="item" />
          </div>

          <div class="modal-footer"></div>
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

.modal-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.modal-header .modal-actions {
  align-self: center;
}

.modal-header .favorite-btn {
  color: #008080;
  float: right;
  align-self: flex-end;
  margin: 0 0.5em;
  background-color: #ccc;
  color: white;
  border: none;
  padding: 0.5em 1em;
  border-radius: 5px;
  cursor: pointer;
}

.modal-header .favorite-btn.favorited {
  background-color: #008080;
}

.modal-header .news-source-link {
  color: #008080;
  float: right;
  align-self: flex-end;
  padding: 0.5em 1em;
}
.modal-header .title {
  margin: 1em 0;
  /* color: #42b983; */
  color: #008080;
}

.modal-header-img {
  text-align: center;
  /* max-width: 900px;
  max-width: -webkit-fill-available; */
  width: 100%;
  margin: 1em auto;
}

.modal-body {
  margin: 20px 0;
  display: flex;
  flex-direction: column;
}

.modal-default-button {
  float: right;
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
