<template>
  <div class="wrapper">
    <img class="logo" :src="netflix" alt="netflix logo" />
    <div class="space"></div>
    <!-- SHOW CURRENT NAME AND PROFILE IMAGE -->
    <div class="currentDiv">
      <div>
        <h1>Name</h1>
        <p>image</p>
      </div>
    </div>
    <div>

    </div>
    <!-- SHOW THE OPTIONS -->
  </div>
</template>

<script>
import netflix from "../../assets/netflix.png";
export default {
  data() {
    return {
      netflix,
    };
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  font-size: 1rem;
  color: black;
  background-color: #141414;
  position: relative;
  display: flex;
  flex-direction: column;
}
.logo {
  position: absolute;
  width: 130px;
  height: auto;
  left: 3vw;
  top: 1vh;
  z-index: 18;
}
.space {
  background-color: transparent;
  height: 12vh;
  width: 100%;
}
.currentDiv {
  width: 100%;
  height: 88vh;
  background-color: aqua;
  text-align: center;
}
</style>
