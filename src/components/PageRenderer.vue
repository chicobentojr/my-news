<script>
export default {
    mounted() {
        console.log("render", this.url)
        // fetch(this.url).
        //     then((response) => {
        //         console.log(response)
        //         response.text().then((text) => {
        //             console.log({ text })
        //             this.$el.outerHTML = text
        //         })
        //     })
    },
    props: {
        url: String
    },
};
</script>
<template>
    <div>Loading ...</div>
    <!-- <iframe :src="url"></iframe> -->
</template>
