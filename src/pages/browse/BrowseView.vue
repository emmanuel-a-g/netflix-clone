<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <div class="heroImageWrapper">
      <img :src="wallpaper" alt="hero image" />
    </div>
    <div class="inner">
      <div class="fillContainer">
        <div class="fillContent">
          <h1>hello world title</h1>
        </div>
      </div>
      <div class="wrapperCarousel">
        <div class="headerCarousel">
          <h2>Movies</h2>
          <div
            class="label"
            :style="{ visibility: showIndicators ? 'visible' : 'hidden' }"
          >
            <p v-for="(item, idx) in list" :key="item">
              <span :class="{ activeLabel: index === idx }">&#9866;</span>
            </p>
          </div>
        </div>
        <TheCarousel
          @updateIdx="updateIdx"
          :showIndicators="showIndicators"
          @mouseenter="show"
          @mouseleave="unshow"
        ></TheCarousel>
      </div>
    </div>
  </div>
</template>

<script>
import TheBrowseNav from "./TheBrowseNav.vue";
import TheCarousel from "../../components/ui/TheCarousel.vue";
import wallpaper from "../../assets/wallpaper.webp";
export default {
  components: {
    TheBrowseNav,
    TheCarousel,
  },
  data() {
    return {
      index: 0,
      showIndicators: false,
      list: ["Action", "Comedy", "Horror", "Suspense"],
      wallpaper,
    };
  },
  methods: {
    updateIdx(newIndex) {
      this.index = newIndex;
    },
    show() {
      this.showIndicators = true;
    },
    unshow() {
      this.showIndicators = false;
    },
  },
};
</script>

<style scoped>
/* background-color: #141414 */
.heroImageWrapper {
  height: 100vh;
  background-color: black;
  position: absolute;
  width: 100%;
}
.heroImageWrapper img {
  width: 100%;
  height: auto;
}
.fillContainer {
  min-height: 45vw;
  max-height: 46vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  /* background-color: rgba(255, 0, 0, 0.254); */
}
.fillContent {
  /* background-color: rgba(127, 255, 212, 0.374); */
  margin-left: 3vw;
}
.inner {
  /* background-color: rgba(255, 255, 255, 0.245); */
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.browseDiv {
  min-height: 110vh;
  background-color: #141414;
  min-width: 350px;
  /* temporary */
  position: relative;
}
.browseDiv h1 {
  text-align: center;
}
.wrapperCarousel {
  min-height: 1vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
}
.headerCarousel h2 {
  margin: 5px 0px;
}
.headerCarousel {
  display: flex;
  justify-content: space-between;
  margin: 0px 60px;
}
/* show progress */
.label {
  display: flex;
  width: 80px;
  justify-content: space-evenly;
  align-items: center;
}
.label p {
  font-size: 2rem;
  color: grey;
  padding: 0;
  margin: 0;
}
.activeLabel {
  font-size: 2rem;
  padding: 0;
  margin: 0;
  color: white;
}
</style>
