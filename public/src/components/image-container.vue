<template lang="html">
    <div>
        <img :src="imageUrl">
    </div>
</template>
<script>
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  props: ["image"],
  name: "imageContainer",
  components: {},
  created: function() {
    this.$watch("image", this.changeImage);
    this.$on("change-image", console.log);
  },

  methods: {
    changeImage() {
      if (this.image.name) {
      this.imageUrl = `/comix/${this.image.name}`;
      }
    }
  }
};
</script>

<style>
img {
  width: 90%;
}
</style>