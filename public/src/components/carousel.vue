<template lang="html">
    <flickity ref="flickity" :options="flickityOptions">
        <div class="carousel-cell">1</div>
        <div class="carousel-cell">2</div>
        <div class="carousel-cell">3</div>
        <div class="carousel-cell">4</div>
        <div class="carousel-cell">5</div>
    </flickity>
</template>
<script>
import Flickity from 'vue-flickity';

export default {
  data() {
    return {
        flickityOptions: {
          initialIndex: 3,
          prevNextButtons: false,
          pageDots: false,
          wrapAround: true
        }
    };
  },
  props: [],
  name: "carousel",
  components: {},
  created: function() {

  },

  methods: {

  }
};
</script>

<style>
img {
  width: 90%;
}
</style>