<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <h1>Currently working on it....</h1>
    <TheCarousel> </TheCarousel>
  </div>
</template>

<script>
import TheBrowseNav from "./TheBrowseNav.vue";
import TheCarousel from "../../components/ui/TheCarousel.vue";
export default {
  components: {
    TheBrowseNav,
    TheCarousel,
  },
};
</script>

<style scoped>
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
</style>
