<template>
  <div class="carouselItem" :style="{ width: width }">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: ["width"],
  // mounted() {},
};
</script>

<style scoped>
.carouselItem {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 15vh;
  background-color: transparent;
  color: white;
}
</style>
