<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <h1>Currently working on it....</h1>
    <div class="wrapper">
      <h2>Movies</h2>
      <TheCarousel> </TheCarousel>
    </div>
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
/* background-color: #141414 */
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
.wrapper {
  min-height: 1vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.wrapper h2 {
  padding-left: 60px;
  margin: 5px 0px;
}
</style>
