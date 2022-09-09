<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 90}%)` }">
      <!-- RENDER ACCORDING TO INNER-WIDTH -->
      <ItemCarousel v-for="item in bigList" :key="item" width="90%">
        <div class="line">
          <!-- render according to innerWidth!!! -->
          <div v-for="(mov, indexTwo) in item" :key="mov">
            something {{ indexTwo + 1 }}
          </div>
        </div>
      </ItemCarousel>
    </div>
    <div v-if="showIndicators" class="prev" @click="prev">
      <img :src="icon" alt="left arrow" />
    </div>
    <div v-if="showIndicators" class="next" @click="next">
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
  emits: ["updateIdx"],
  props: ["showIndicators", "list", "bigList"],
  data() {
    return {
      index: 0,
      leftArrow: false,
      icon,
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
      this.$emit("updateIdx", newIndex);
    },
  },
  computed: {
    // something
  },
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;
  min-height: 15vh;
  background-color: transparent;
}
.inner {
  white-space: nowrap;
  transition: transform 0.75s;
  margin: 0;
  margin-left: 60px;
  background-color: transparent;
}
.active {
  color: white;
}
.prev {
  all: unset;
  position: absolute;
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
  background-color: rgba(0, 0, 0, 0.651);
}
.prev img:hover {
  scale: 1.2;
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
}
.next:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.651);
}
.next img {
  height: 20px;
  width: 20px;
}
.next img:hover {
  scale: 1.2;
}
.line {
  margin: 0px 8px 0px 0px;
  gap: 8px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  min-height: 15vh;
  text-align: center;
}
.line div {
  background-color: transparent;
  /* IMPORTANT CHECK */
  flex: 1;
  min-height: 14.5vh;
  border: 1px solid white;
}
/* inner div of each one for spacing */
</style>
