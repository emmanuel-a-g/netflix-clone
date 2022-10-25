<template>
  <div class="heroImageWrapper">
    <div class="vingete" :style="{ height: idealHeight }"></div>
    <img ref="imageRef" :src="getHeroImage" alt="hero image" />
  </div>
</template>

<script>
// const mobileBreakpoint = 400;
export default {
  props: ["hero"],
  data() {
    return {
      wallpaperRef: null,
      vingetteHeight: undefined,
    };
  },
  methods: {
    setHeightImage() {
      let idealHeight = this.wallpaperRef.clientHeight;
      this.vingetteHeight = idealHeight + "px";
    },
  },
  computed: {
    idealHeight() {
      if (!this.vingetteHeight) {
        return "55.7vw";
      } else {
        return this.vingetteHeight;
      }
    },
    getHeroImage() {
      return this.hero ? this.hero.heroImage : "";
    },
  },
  mounted() {
    window.addEventListener("resize", this.setHeightImage);
    this.wallpaperRef = this.$refs.imageRef;
    if (this.wallpaperRef) {
      this.setHeightImage();
    }
  },
};
</script>

<style scoped>
.heroImageWrapper {
  height: 100vh;
  position: absolute;
  width: 100%;
  background-color: #141414;
}
.heroImageWrapper img {
  width: 100%;
  height: auto;
}
.vingete {
  position: absolute;
  width: 100%;
  /* important */
  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
}
/* @media only screen and (max-width: 1000px) {}
@media only screen and (max-width: 850px) {}
@media only screen and (max-width: 700px) {} */
</style>
