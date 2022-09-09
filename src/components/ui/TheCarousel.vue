<template>
  <div class="carousel">
    <div class="inner" :style="{ transform: `translateX(-${index * 90}%)` }">
      <!-- RENDER ACCORDING TO INNER-WIDTH -->
      <ItemCarousel v-for="item in bigList" :key="item" width="90%">
        <div class="line">
          <!-- render according to innerWidth!!! -->
          <!-- something {{ indexTwo + 1 }} -->
          <div
            class="card"
            v-for="(mov, indexTwo) in item"
            :key="mov"
            :class="{ hide: mov === 'blank' }"
          >
            <span>{{ indexTwo + 1 }}</span>
            <!-- <img class="cardImage" src="https://res.cloudinary.com/milito/image/fetch/https://res.cloudinary.com/milito/image/upload/v1662708770/netflix/spiderman3.webp" alt="image"> -->
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
  /* pixels?? */
  /* min-height: 16vh; */
  height: 130px;
  /* background-color: transparent; */
  /* background-color: transparent; */
  background-color: rgba(255, 0, 0, 0.156);
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
  /* min-height: 16vh; */
  height: 128px;
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
  /* min-height: 16vh; */
  height: 128px;
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
  /* min-height: 15vh; */
  height: 128px;
  text-align: center;
}
/* Styling for movie card */
.card {
  background: url(https://res.cloudinary.com/milito/image/fetch/https://res.cloudinary.com/milito/image/upload/v1662708770/netflix/spiderman3.webp)
    no-repeat;
  background-position: center;
  background-size: contain;
  background-color: transparent;
  flex: 1;
  height: 126px;
  border: 1px solid white;
  padding: 0;
  margin: 0;
}
.card span {
  position: absolute;
}
.hide {
  border: 1px solid red;
  visibility: hidden;
}
</style>
