<template lang="html">
        <div>
            <div class="center-of-sreen">
                <p>Краткая история моих выпиваний</p>
                <image-link-list 
                    :image-list="imagesAvailable.paginationList ? imagesAvailable.paginationList : [0,0,0,0,0,0]"
                    v-on:changeimage="changeCurentImage">
                    </image-link-list>
                <image-container :image="(imagesAvailable.list && imagesAvailable.list.length) ? currentImage : ''"></image-container>
            </div>

        </div>
</template>
<script>
import ImageContainer from "./image-container.vue";
import ImageLinkList from "./image-link-list.vue";

export default {
  data() {
    return {
      imagesAvailable: {},
      currentImage: {}
    };
  },
  components: {
    ImageContainer,
    ImageLinkList
  },
  methods: {
    changeCurentImage(index) {
      this.currentImage = this.imagesAvailable.list.find(
        image => image.index == index
      );
    }
  },
  created: function() {
    axios
      .get(`/images/available?login=${this.$cookie.get("login")}`)
      .then(({ data }) => {
        this.imagesAvailable = data;
        this.currentImage = data.list[0];
      })
      .catch(error => {
        this.errorText = error.response.data;
        this.isShowError = true;
        console.error(error);
      });
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