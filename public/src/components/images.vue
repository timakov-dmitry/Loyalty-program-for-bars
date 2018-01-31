<template lang="html">
    <div class="center-of-sreen">
        <p>Открытые страницы комиксов</p>
        <image-link-list :image-list="imagesAvailable.paginationList" @changeimage="changeCurrentImage" />
        <vuecarousel v-bind:images="imagesSeq" />
        <img v-if="!currentPage" src="/comix/404image.jpg" alt="not open images">
    </div>
</template>
<script>
import ImageContainer from "./image-container.vue";
import ImageLinkList from "./image-link-list.vue";

export default {
  data() {
    return {
      imagesAvailable: {},
      currentPage: null,
      imagesSeq: [],
    };
  },
  components: {ImageContainer, ImageLinkList},
  methods: {
    changeCurrentImage(index) {
      this.currentPage = index;
      if (!!this.imagesAvailable.list[this.currentPage]) {
        this.imagesSeq = this.imagesAvailable.list[this.currentPage].map(image=>`/comix/${image.name}`);
      }
    }
  },
  created: function() {
    axios
      .get(`/images/available?login=${this.$cookie.get("login")}`)
      .then(({ data }) => {
        this.imagesAvailable = data;
        this.currentPage = data.defaultPage;
        if (data && data.list[this.currentPage] &&  data.list[this.currentPage].length) {
          this.imagesSeq = data.list[this.currentPage].map(image=>`/comix/${image.name}`);
        }
      })
      .catch(console.error(error));
  }
};
</script>

<style scoped>
.menu {
  color: azure;
}
.center-of-sreen {
  width: 100%;
  height: 100px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}
div.center-of-sreen p {
  text-align: center;
  color: white;
}
html {
  background: -webkit-radial-gradient(center ellipse, #ef0e39 0%, #000000 100%);
  background: radial-gradient(ellipse at center, #ef0e39 0%, #000000 100%);
  overflow: hidden;
}
</style>