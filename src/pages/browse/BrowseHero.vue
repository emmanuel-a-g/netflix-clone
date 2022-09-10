<template>
  <div class="heroImageWrapper">
    <div class="vingete" :style="{ height: idealHeight }"></div>
    <img
      ref="imageRef"
      src="https://res.cloudinary.com/milito/image/upload/v1662756497/netflix/nolimit_wallpaper.webp"
      alt="hero image"
    />
  </div>
</template>

<script>
export default {
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
  },
  mounted() {
    window.addEventListener("resize", this.setHeightImage);
    this.wallpaperRef = this.$refs.imageRef;
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
