<template lang="html">
        <carousel :perPage="1">
        <slide v-for="imageUrl in images" :key="imageUrl">
            <img :src="imageUrl">
        </slide>
    </carousel>
</template>
<script>
  import { Carousel, Slide } from 'vue-carousel';
export default {
  data() {
    return {
    };
  },
  props: ['images'],
  name: "vuecarousel",
  components: {Carousel, Slide}
};
</script>

<style>
img {
    width: 90%;
}
</style>