<template>
  <div
    class="theBox"
    :class="{ visibleClass: show, hiddenClass: !show }"
    @mouseleave="handleClose"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.theBox {
  height: 100%;
}
</style>
