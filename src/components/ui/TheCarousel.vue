<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 96}%)` }">
      <ItemCarousel v-for="(item, inx) in bigList" :key="inx" width="96%">
        <div class="line">
          <TheCard
            v-for="(mov, idx) in item"
            :index="idx"
            :key="idx"
            :mov="mov"
            :total="item.length"
            :identifier="identifier"
            :mobileDetected="mobileDetected"
            :mylist="mylist"
          >
          </TheCard>
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
import TheCard from "../app/TheCard.vue";
import right from "../../assets/rightArr.png";
import left from "../../assets/leftArr.png";
import { mapGetters } from "vuex";

export default {
  components: {
    ItemCarousel,
    TheCard,
  },
  emits: ["updateIdx"],
  props: [
    "showIndicators",
    "indicators",
    "bigList",
    "mobileDetected",
    "mylist",
  ],

  data() {
    return {
      index: 0,
      leftArrow: false,
      left,
      right,
    };
  },

  computed: {
    ...mapGetters({
      identifier: "getIdentifier",
    }),
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
        newIndex = this.indicators.length - 1;
      } else if (newIndex >= this.indicators.length) {
        newIndex = 0;
      }
      this.index = newIndex;
      this.$emit("updateIdx", newIndex);
    },
  },

  watch: {
    bigList() {
      this.index = 0;
    },
  },
};
</script>

<style scoped>
/* overflow: hidden; */
/* ^^REMOVED AND ADDED IN CAROUSELWRAPPER^^ */
.carousel {
  position: relative;
  background-color: transparent;
  height: 140px;
}
.inner {
  white-space: nowrap;
  transition: transform 0.75s;
  margin: 0;
  margin-left: 60px;
  background-color: transparent;
  height: 100%;
}
.active {
  color: white;
}
.prev {
  all: unset;
  position: absolute;
  left: 0;
  top: 0;
  /* height: 126px; */
  height: 100%;
  width: 60px;
  background-color: rgba(0, 0, 0, 0.438);
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
  height: 100%;
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
  /* height: 128px; */
  height: 100%;
  text-align: center;
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
    height: 136px;
  }
}
@media only screen and (min-width: 1400px) {
  .carousel {
    height: 150px;
  }
}
@media only screen and (min-width: 1600px) {
  .carousel {
    height: 170px;
  }
}
@media only screen and (min-width: 2000px) {
  .carousel {
    height: 200px;
  }
}
@media only screen and (min-width: 2600px) {
  .carousel {
    height: 220px;
  }
}
</style>
