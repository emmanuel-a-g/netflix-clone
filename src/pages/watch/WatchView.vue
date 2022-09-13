<template>
  <div class="watchDiv">
    <div class="content">
      <h1>Watch View</h1>
      <h5>Loading...</h5>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const videoId = this.$route.params.videoId;
    console.log(videoId);
  },
};
</script>

<style scoped>
.watchDiv {
  min-height: 100vh;
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  text-align: center;
}
</style>
