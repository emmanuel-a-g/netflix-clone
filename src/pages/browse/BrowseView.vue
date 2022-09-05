<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <h1>Currently working on it....</h1>
  </div>
</template>

<script>
import TheBrowseNav from "./TheBrowseNav.vue";
export default {
  components: {
    TheBrowseNav,
  },
};
</script>

<style scoped>
.browseDiv {
  min-height: 100vh;
  background-color: #141414;
  /* temporary */
  position: relative;
}
.browseDiv h1 {
  text-align: center;
}
</style>
