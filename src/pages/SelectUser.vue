<template>
  <div class="selectUserDiv">
    <img :src="image" alt="netflix logo" />
    <SelectProfile></SelectProfile>
  </div>
</template>

<script>
import SelectProfile from "../components/app/SelectProfile.vue";
import image from "../assets/netflix.png";
export default {
  components: {
    SelectProfile,
  },
  data() {
    return {
      name: "",
      image,
    };
  },
};
</script>

<style scoped>
.selectUserDiv {
  min-height: 100vh;
  display: relative;
  /* special color */
  background-color: #141414;
}
.selectUserDiv img {
  width: 100px;
  height: auto;
  position: absolute;
  left: 1vw;
}
</style>
