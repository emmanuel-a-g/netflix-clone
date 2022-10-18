<template>
  <div
    class="card"
    :class="{ hide: mov === 'blank' }"
    :style="{
      'background-image': mov.imageUrl ? `url(${mov.imageUrl})` : 'none',
    }"
    @mouseover="startTimer"
    @mouseleave="handleClose"
  >
    <CarouselBox
      @closeCard="handleClose"
      :theIdx="index"
      :theMovie="mov"
      :show="show"
      :total="total"
      :identifier="identifier"
      :mobileDetected="mobileDetected"
      :mylist="mylist"
    ></CarouselBox>
  </div>
</template>

<script>
import CarouselBox from "../app/CarouselBox.vue";
export default {
  components: {
    CarouselBox,
  },
  props: ["mov", "index", "total", "identifier", "mobileDetected", "mylist"],
  data() {
    return {
      show: false,
      timer: null,
    };
  },
  methods: {
    handleOpen() {
      this.show = true;
    },
    handleClose() {
      this.show = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    startTimer() {
      if (!this.show && !this.timer) {
        this.timer = setTimeout(() => {
          this.handleOpen();
        }, 500);
      }
    },
  },
  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  },
};
</script>

<style scoped>
/* Styling for movie card */
.card {
  background-color: rgb(96, 96, 96);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  flex: 1;
  /* height: 126px; */
  height: 100%;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  position: relative;
}
.card:hover {
  cursor: pointer;
}
.hide {
  visibility: hidden;
}
</style>
