<template>
  <div class="browseDiv">
    <TheBrowseNav :show="true"></TheBrowseNav>
    <BrowseHero :hero="hero"></BrowseHero>
    <div class="inner">
      <BrowseTop :hero="hero"></BrowseTop>
      <div class="wrapperCarousel">
        <TheCarouselComp
          title="Trending Now"
          :listNumber="1"
          :cards="cardsNum"
          :mobileDetected="mobileDetected"
        ></TheCarouselComp>
        <TheCarouselCompList
          v-if="identifier && showMyList"
          :identifier="identifier"
          :cards="cardsNum"
          @hideList="hideList"
          :mobileDetected="mobileDetected"
        >
        </TheCarouselCompList>
        <TheCarouselComp
          title="Recently Added"
          :listNumber="2"
          :cards="cardsNum"
          :mobileDetected="mobileDetected"
        >
        </TheCarouselComp>
        <TheCarouselComp
          title="New Releases"
          :listNumber="1"
          :cards="cardsNum"
          :mobileDetected="mobileDetected"
        >
        </TheCarouselComp>
        <TheCarouselComp
          title="Popular on Netflix"
          :listNumber="2"
          :cards="cardsNum"
          :mobileDetected="mobileDetected"
        >
        </TheCarouselComp>
        <TheCarouselComp
          title="Bingeworthy"
          :listNumber="1"
          :cards="cardsNum"
          :mobileDetected="mobileDetected"
        >
        </TheCarouselComp>
        <div class="moreContent">
          <TheCarouselComp
            title="Exciting Movies"
            :listNumber="2"
            :cards="cardsNum"
            :mobileDetected="mobileDetected"
          >
          </TheCarouselComp>
          <TheCarouselComp
            title="Blockbuster Movies"
            :listNumber="1"
            :cards="cardsNum"
            :mobileDetected="mobileDetected"
          >
          </TheCarouselComp>
          <TheCarouselComp
            title="Acclaimed Writers"
            :listNumber="2"
            :cards="cardsNum"
            :mobileDetected="mobileDetected"
          >
          </TheCarouselComp>
          <TheCarouselComp
            title="Familiar Favorites"
            :listNumber="1"
            :cards="cardsNum"
            :mobileDetected="mobileDetected"
          >
          </TheCarouselComp>
        </div>
        <TheFooter color="#141414" position="relative"></TheFooter>
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
import TheCarouselCompList from "../../components/app/TheCarouselCompList.vue";
import TheCarouselComp from "../../components/app/TheCarouselComp.vue";
import TheBrowseNav from "./TheBrowseNav.vue";
import BrowseHero from "./BrowseHero.vue";
import BrowseTop from "./BrowseTop.vue";
import TheFooter from "../../components/ui/TheFooter.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    TheCarouselCompList,
    TheBrowseNav,
    TheCarouselComp,
    BrowseHero,
    BrowseTop,
    TheFooter,
  },

  data() {
    return {
      cardsNum: 6,
      showMyList: true,
      mobileDetected: false,
    };
  },

  computed: {
    ...mapGetters({
      heroMaterial: "getHeroMaterial",
      identifier: "getIdentifier",
    }),

    hero() {
      return this.heroMaterial || null;
    },
  },

  methods: {
    hideList() {
      this.showMyList = false;
    },

    setMargins() {
      //we dont change margins unless we have to!
      let width = window.innerWidth;
      const cardsNum = this.cardsNum;
      if (width > breakpointSix && cardsNum === 6) {
        return;
      } else if (
        width < breakpointSix &&
        width >= breakpointFive &&
        cardsNum !== 5
      ) {
        this.cardsNum = 5;
      } else if (
        width < breakpointFive &&
        width >= breakpointFour &&
        cardsNum !== 4
      ) {
        this.cardsNum = 4;
      } else if (
        width < breakpointFour &&
        width >= breakpointThree &&
        cardsNum !== 3
      ) {
        this.cardsNum = 3;
      } else if (
        width < breakpointThree &&
        width >= breakpointTwo &&
        cardsNum !== 2
      ) {
        this.cardsNum = 2;
      } else if (width > breakpointSix && cardsNum !== 6) {
        this.cardsNum = 6;
      } else if (width <= breakpointTwo && cardsNum !== 2) {
        this.cardsNum = 2;
      }
    },
  },

  beforeMount() {
    // console.time("before");
    window.addEventListener("resize", this.setMargins);
    this.setMargins();
    // console.timeEnd("before");
  },

  mounted() {
    const isMobile = window.matchMedia(
      "only screen and (max-width: 400px)"
    ).matches;

    if (isMobile) {
      this.mobileDetected = true;
    }
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.setMargins);
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
  min-height: 5vh;
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
@media only screen and (max-width: 400px) {
  .wrapperCarousel {
    padding-top: 16px;
  }
}
</style>
