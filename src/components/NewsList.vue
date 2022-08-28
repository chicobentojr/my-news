<script>
import NewsItem from "./NewsItem.vue";
export default {
    data() {
        return {
            items: []
        };
    },
    methods: {
        handleItemSelected: function (item) {
            this.$emit('onNewsSelected', item);
        }
    },
    mounted() {
        console.log("mount");
        fetch("https://newsapi.org/v2/everything?" + new URLSearchParams({
            q: "bitcoin",
            apiKey: import.meta.env.VITE_NEWS_API_KEY
        }))
            .then((response) => {
                response.json().then(data => {
                    console.log({ data });
                    this.items = data.articles;
                });
            });
    },
    components: { NewsItem }
}
</script>
<template>
    <div>
        <div v-for="item in items" :key="item.title">
            <NewsItem :item="item" @onItemSelected="handleItemSelected" />
        </div>
    </div>

</template>
