<script>
export default {
    mounted() {
    },
    updated() {
        console.log(this.visible)
    },
    methods: {
        closeModal: function () {
            console.log('fecha')
            this.$emit('onClose')
        }
    },
    props: {
        visible: Boolean,
        item: Object
    },
};
</script>
<template>
    <Transition name="modal">
        <div v-if="visible" class="modal-mask" @click="closeModal">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3>{{ item.title }}</h3>
                    </div>
                    <!-- TODO: Add a close button -->
                    <!-- <span class="btn-close">&times;</span> -->
                    <div class="modal-content">
                        <p>
                            By: <strong>{{ item.author }}</strong> at
                            {{ item.publishedAt }}
                        </p>

                        <p>{{ item.description }}</p>

                        <p>{{ item.content }}</p>
                        <!-- TODO: Add iframe to display entire report??? -->
                    </div>

                    <div class="modal-footer">

                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>
    

<style>
.modal-mask {
    position: fixed;
    z-index: 999;
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
    margin: 0 auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.1s ease;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
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