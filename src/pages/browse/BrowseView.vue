<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <BrowseHero></BrowseHero>
    <div class="inner">
      <BrowseTop></BrowseTop>
      <div class="wrapperCarousel">
        <TheCarouselComp
          title="Recently Added"
          :listNumber="1"
        ></TheCarouselComp>
        <TheCarouselComp title="My List" :listNumber="2">
        </TheCarouselComp>
        <div class="moreContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
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
/* @media only screen and (max-width: 1000px) {} */
/* @media only screen and (max-width: 850px) {} */
/* @media only screen and (max-width: 700px) {} */
</style>
