<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 90}%)` }">
      <ItemCarousel v-for="item in list" :key="item" width="90%">
        <div class="line">
          <div id="special">{{ item }} something 1</div>
          <div>{{ item }} something 2</div>
          <div>{{ item }} something 3</div>
          <div>{{ item }} something 4</div>
          <div>{{ item }} something 5</div>
        </div>
      </ItemCarousel>
    </div>
    <div v-if="leftArrow" class="prev" @click="prev">
      <img :src="icon" alt="left arrow" />
    </div>
    <div class="next" @click="next">
      <img :src="icon" alt="right arrow" width="16px" height="16px" />
    </div>
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
      leftArrow: false,
      list: ["Action", "Comedy", "Horror", "Suspense"],
      icon,
      timer: null,
    };
  },
  methods: {
    prev() {
      this.updateIndex(this.index - 1);
    },
    next() {
      if (!this.leftArrow) {
        this.leftArrow = true;
      }
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
    // this.timer = setInterval(() => {
    //   this.next();
    // }, 3000);
    // return () => clearInterval();
  },
  beforeUnmount() {
    // clearInterval(this.timer);
  },
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  /* overflow-x: visible; */
  /* scroll-behavior: unset; */
  position: relative;
  min-height: 15vh;
  /* background-color: white; */
  width: 100vw;
}
.inner {
  white-space: nowrap;
  transition: transform 0.5s;
  margin-left: 60px;
}
.active {
  color: white;
}
.prev {
  all: unset;
  position: absolute;
  /* left: 6vw; */
  left: 0;
  top: 0;
  min-height: 15vh;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.438);
  display: flex;
  align-items: center;
  justify-content: center;
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
  right: 0;
  top: 0;
  min-height: 15vh;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.438);
  display: flex;
  align-items: center;
  justify-content: center;
  /* transform: translateY(-90%); */
}
.next:hover {
  cursor: pointer;
}
.next img {
  height: 20px;
  width: 20px;
}
/* made up */
#special {
  /* background-color: red; */
  /* margin-left: -12px; */
}
.line {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  text-align: center;
}
.line div {
  background-color: indianred;
  width: 20%;
  border: 1px solid white;
  min-height: 15vh;
}
/* inner div of each one for spacing */
</style>
