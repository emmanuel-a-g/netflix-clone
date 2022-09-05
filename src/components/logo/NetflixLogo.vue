<template>
  <div class="logoDiv">
    <img :src="logo" alt="netflix logo" />
  </div>
</template>

<script>
import logo from "../../assets/netflix.png";
export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
.logoDiv {
  position: absolute;
  top: -15px;
  left: 10px;
}
.logoDiv img {
  width: 140px;
  height: auto;
}
</style>
