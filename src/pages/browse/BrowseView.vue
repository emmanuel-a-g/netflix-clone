<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <div class="inner">
      <h1>Movies....</h1>
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
.browseDiv {
  min-height: 110vh;
  background-color: #141414;
  min-width: 350px;
  /* temporary */
  position: relative;
}
.inner {
  padding-top: 10vh !important;
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
