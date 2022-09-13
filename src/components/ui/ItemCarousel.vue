<template>
  <div class="carouselItem" :style="{ width: width }">
    <slot> </slot>
  </div>
</template>

<script>
export default {
  props: ["width"],
};
</script>

<style scoped>
.carouselItem {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: white;
  height: 100%;
}
</style>
