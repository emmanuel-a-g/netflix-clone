<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 90}%)` }">
      <ItemCarousel v-for="item in bigList" :key="item" width="90%">
        <div class="line">
          <div
            class="card"
            v-for="mov in item"
            :key="mov"
            :class="{ hide: mov === 'blank' }"
            :style="{
              'background-image': `url(${mov.imageUrl})`,
            }"
          >
            <!-- <p>{{ mov.title }}</p> -->
          </div>
        </div>
      </ItemCarousel>
    </div>
    <div v-if="showIndicators" class="prev" @click="prev">
      <img :src="left" alt="left arrow" />
    </div>
    <div v-if="showIndicators" class="next" @click="next">
      <img :src="right" alt="right arrow" width="16px" height="16px" />
    </div>
  </div>
</template>

<script>
import ItemCarousel from "./ItemCarousel.vue";
import right from "../../assets/rightArr.png";
import left from "../../assets/leftArr.png";
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
      left,
      right,
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
};
</script>

<style scoped>
.carousel {
  overflow: hidden;
  position: relative;
  height: 165px;
  background-color: transparent;
}
.inner {
  white-space: nowrap;
  transition: transform 0.75s;
  margin: 0;
  margin-left: 60px;
  background-color: transparent;
  height: 128px;
}
.active {
  color: white;
}
.prev {
  all: unset;
  position: absolute;
  left: 0;
  top: 0;
  height: 126px;
  width: 60px;
  /* background-color: rgba(0, 0, 0, 0.438); */
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.prev img,
.next img {
  height: 30px;
  width: 30px;
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
  height: 126px;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.438);
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.next:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.651);
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
  height: 128px;
  text-align: center;
}
/* Styling for movie card */
.card {
  background-color: rgb(96, 96, 96);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  flex: 1;
  height: 126px;
  padding: 0;
  margin: 0;
  border-radius: 4px;
}
.card span {
  position: absolute;
}
/* CLASS FOR EMPTY MOVIES */
.hide {
  visibility: hidden;
}
@media only screen and (max-width: 700px) {
  .inner {
    margin-left: 25px;
  }
  .prev,
  .next {
    width: 25px;
  }
  .prev img,
  .next img {
    height: 20px;
    width: 20px;
  }
}
@media only screen and (max-width: 500px) {
  .carousel {
    /* changes text and sliders height only */
    height: 136px;
  }
}
</style>
