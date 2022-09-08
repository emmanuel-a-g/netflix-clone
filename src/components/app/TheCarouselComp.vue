<template>
  <div class="noWrap">
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
</template>

<script>
import TheCarousel from "../../components/ui/TheCarousel.vue";
export default {
  components: {
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
/* unique nowrap */
.noWrap {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
/* unique nowrap */
.headerCarousel {
  display: flex;
  justify-content: space-between;
  margin: 0px 60px;
}
.headerCarousel h2 {
  margin: 5px 0px;
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
