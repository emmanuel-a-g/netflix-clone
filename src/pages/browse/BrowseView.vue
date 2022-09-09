<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <div class="heroImageWrapper">
      <div class="vingete" :style="{ height: idealHeight }"></div>
      <img ref="imageRef" :src="wallpaper" alt="hero image" />
    </div>
    <div class="inner">
      <div class="fillContainer">
        <div class="fillContent">
          <h1>Movie Title Here</h1>
        </div>
      </div>
      <div class="wrapperCarousel">
        <TheCarouselComp></TheCarouselComp>
        <div class="moreContent">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheBrowseNav from "./TheBrowseNav.vue";
import wallpaper from "../../assets/wallpaper.webp";
import TheCarouselComp from "../../components/app/TheCarouselComp.vue";
export default {
  components: {
    TheBrowseNav,
    TheCarouselComp,
  },
  data() {
    return {
      wallpaper,
      vingetteHeight: undefined,
    };
  },
  methods: {
    setHeightImage() {
      let idealHeight = this.$refs.imageRef.clientHeight;
      this.vingetteHeight = idealHeight + "px";
    },
  },
  computed: {
    idealHeight() {
      if (!this.vingetteHeight) {
        return "57vw";
      } else {
        return this.vingetteHeight;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.setHeightImage);
  },
};
</script>

<style scoped>
/* background-color: #141414 */
.heroImageWrapper {
  height: 100vh;
  position: absolute;
  width: 100%;
  background-color: #141414;
}
.vingete {
  position: absolute;
  width: 100%;
  /* important */
  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
}
.heroImageWrapper img {
  width: 100%;
  height: auto;
}
.fillContainer {
  min-height: 43vw;
  max-height: 46vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.fillContent {
  margin-left: 3vw;
}
.inner {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
}
.moreContent {
  background-color: #141414;
  min-height: 100vh;
}
.browseDiv {
  min-height: 100vh;
  background-color: #141414;
  min-width: 350px;
  /* temporary */
  position: relative;
}
.browseDiv h1 {
  text-align: center;
}
.wrapperCarousel {
  background-color: transparent;
  display: flex;
  flex-direction: column;
}
</style>
