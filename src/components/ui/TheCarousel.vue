<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 100}%)` }">
      <ItemCarousel v-for="item in list" :key="item" width="100%">{{
        item
      }}</ItemCarousel>
    </div>
    <button class="prev" @click="prev">
      <img :src="icon" alt="left arrow" />
    </button>
    <button class="next" @click="next">
      <img :src="icon" alt="right arrow" width="16px" height="16px" />
    </button>
  </div>
</template>

<script>
import ItemCarousel from "./ItemCarousel.vue";
import icon from "../../assets/logo.png";
export default {
  components: {
    ItemCarousel,
  },
  data() {
    return {
      index: 0,
      list: ["Emmanuel", "Arturo", "Veronica", "Michael", "Wendy"],
      icon,
      timer: null,
    };
  },
  methods: {
    prev() {
      this.updateIndex(this.index - 1);
    },
    next() {
      this.updateIndex(this.index + 1);
    },
    updateIndex(newIndex) {
      if (this.index < 0) {
        newIndex = this.list.length - 1;
      } else if (newIndex >= this.list.length) {
        newIndex = 0;
      }
      this.index = newIndex;
    },
  },
  mounted() {
    //start slider with setTimeout
    this.timer = setInterval(() => {
      this.next();
    }, 3000);
    return () => clearInterval();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;
  min-height: 15vh;

}
.inner {
  white-space: nowrap;
  transition: transform 0.5s;
}
.active {
  color: white;
}
.prev {
  all: unset;
  position: absolute;
  left: 6vw;
  top: 6vh;
}
.prev img {
  height: 20px;
  width: 20px;
}
.prev:hover {
  cursor: pointer;
}
.next {
  all: unset;
  position: absolute;
  left: 92vw;
  top: 6vh;
  /* transform: translateY(-90%); */
}
.next:hover {
  cursor: pointer;
}
.next img {
  height: 20px;
  width: 20px;
}
</style>
