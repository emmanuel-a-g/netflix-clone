<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <BrowseHero :hero="hero"></BrowseHero>
    <div class="inner">
      <BrowseTop :hero="hero">></BrowseTop>
      <div class="wrapperCarousel">
        <TheCarouselComp
          title="Recently Added"
          :listNumber="1"
          :cards="cardsNum"
        ></TheCarouselComp>
        <TheCarouselComp title="My List" :listNumber="2" :cards="cardsNum">
        </TheCarouselComp>
        <div class="moreContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
let breakpointSix = 1200;
let breakpointFive = 1000;
let breakpointFour = 700;
let breakpointThree = 635;
let breakpointTwo = 500;
//DON'T SHOW video <330px
import TheCarouselComp from "../../components/app/TheCarouselComp.vue";
import TheBrowseNav from "./TheBrowseNav.vue";
import BrowseHero from "./BrowseHero.vue";
import BrowseTop from "./BrowseTop.vue";
export default {
  components: {
    TheBrowseNav,
    TheCarouselComp,
    BrowseHero,
    BrowseTop,
  },
  data() {
    return {
      hero: {},
      cardsNum: 6,
    };
  },
  methods: {
    setMargins() {
      //we dont change margins unless we have to!
      let width = window.innerWidth;
      if (width > breakpointSix && this.cardsNum === 6) {
        return;
      } else if (
        width < breakpointSix &&
        width > breakpointFive &&
        this.cardsNum !== 5
      ) {
        this.cardsNum = 5;
      } else if (
        width < breakpointFive &&
        width > breakpointFour &&
        this.cardsNum !== 4
      ) {
        this.cardsNum = 4;
      } else if (
        width < breakpointFour &&
        width > breakpointThree &&
        this.cardsNum !== 3
      ) {
        this.cardsNum = 3;
      } else if (
        width < breakpointThree &&
        width > breakpointTwo &&
        this.cardsNum !== 2
      ) {
        this.cardsNum = 2;
      } else if (width > breakpointSix && this.cardsNum !== 6) {
        this.cardsNum = 6;
      } else if (width < breakpointTwo && this.cardsNum !== 2) {
        this.cardsNum = 2;
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.setMargins);
    this.setMargins();
    this.hero = this.$store.getters.getHeroMaterial;
  },
  mounted() {
    if (!this.hero) {
      this.hero = this.$store.getters.getHeroMaterial;
    }
  },
};
</script>

<style scoped>
/* background-color: #141414 */
.inner {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: transparent;
}
.moreContent {
  background-color: #141414;
  min-height: 100vh;
}
.browseDiv {
  min-height: 100vh;
  background-color: #141414;
  min-width: 350px;
  /* temporary */
  position: relative;
}
.browseDiv h1 {
  text-align: center;
}
.wrapperCarousel {
  background-color: transparent;
  display: flex;
  flex-direction: column;
  /* EXTREMELY IMPORTANT FOR CAROUSEL */
  overflow: hidden;
  /* making space for box popover */
  /* border-top: 1px solid red; */
  padding-top: 50px;
  /* making space for box popover */
}
</style>
