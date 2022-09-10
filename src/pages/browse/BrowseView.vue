<template>
  <div class="browseDiv">
    <TheBrowseNav></TheBrowseNav>
    <div class="heroImageWrapper">
      <div class="vingete" :style="{ height: idealHeight }"></div>
      <img
        ref="imageRef"
        src="https://res.cloudinary.com/milito/image/upload/v1662756497/netflix/nolimit_wallpaper.webp"
        alt="hero image"
      />
    </div>
    <div class="inner">
      <div class="fillContainer">
        <div class="fillContent">
          <!-- <h1>No Limit</h1> -->
          <img
            id="heroTitle"
            src="https://res.cloudinary.com/milito/image/upload/v1662756497/netflix/nolimit_title.webp"
            alt="hero title"
          />
          <p>
            He's an alluring famouse driver. She's a rising star. Their love is
            as deep as the ocean - and just as dangerous once she comes for his
            world record.
          </p>
          <div id="buttonDiv">
            <button id="playButton">
              <img :src="play" alt="play icon" /> Play
            </button>
            <button id="infoButton">
              <img :src="info" alt="info icon" />More Info
            </button>
          </div>
          <span id="rating">TV-MA</span>
        </div>
      </div>
      <div class="wrapperCarousel">
        <TheCarouselComp
          title="Recently Added"
          :listNumber="1"
        ></TheCarouselComp>
        <TheCarouselComp
          title="Continue Watching"
          :listNumber="2"
        ></TheCarouselComp>
        <TheCarouselComp title="Trending Now" :listNumber="1"></TheCarouselComp>
        <TheCarouselComp
          title="Watch It Again"
          :listNumber="2"
        ></TheCarouselComp>
        <div class="moreContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import TheBrowseNav from "./TheBrowseNav.vue";
import wallpaper from "../../assets/wallpaper.webp";
import TheCarouselComp from "../../components/app/TheCarouselComp.vue";
import play from "../../assets/play.png";
import info from "../../assets/info.png";
export default {
  components: {
    TheBrowseNav,
    TheCarouselComp,
  },
  data() {
    return {
      wallpaper,
      play,
      info,
      vingetteHeight: undefined,
      wallpaperRef: null,
    };
  },
  methods: {
    setHeightImage() {
      let idealHeight = this.wallpaperRef.clientHeight;
      this.vingetteHeight = idealHeight + "px";
    },
  },
  computed: {
    idealHeight() {
      if (!this.vingetteHeight) {
        return "55.7vw";
      } else {
        return this.vingetteHeight;
      }
    },
  },
  mounted() {
    window.addEventListener("resize", this.setHeightImage);
    this.wallpaperRef = this.$refs.imageRef;
  },
};
</script>

<style scoped>
/* background-color: #141414 */
.heroImageWrapper {
  height: 100vh;
  position: absolute;
  width: 100%;
  background-color: #141414;
}
.vingete {
  position: absolute;
  width: 100%;
  /* important */
  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
}
.heroImageWrapper img {
  width: 100%;
  height: auto;
}
#heroTitle {
  position: absolute;
  /* top: 22vh; */
  top: 12.5vw;
  left: 60px;
  /* width: 460px; */
  width: 32vw;
  height: auto;
}
.fillContainer {
  min-height: 43vw;
  max-height: 46vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
}
.fillContent {
  margin-left: 3vw;
}
.fillContent p {
  position: absolute;
  /* top: 22vh; */
  top: 26.5vw;
  left: 60px;
  /* width: 460px; */
  min-width: 32vw;
  max-width: 34vw;
  word-wrap: normal;
  font-size: 1rem;
  margin: 0;
  padding: 0;
}
#buttonDiv {
  position: absolute;
  top: 33vw;
  left: 60px;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  min-width: 19.5vw;
}
#buttonDiv button {
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  min-height: 3vw;
  font-weight: bold;
}
#playButton {
  min-width: 8.5vw;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
}
#playButton img {
  width: 1.4vw;
  height: auto;
}
#infoButton {
  min-width: 10vw;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  background-color: rgba(100, 100, 100, 0.364);
}
#infoButton img {
  width: 1.6vw;
  height: auto;
}
#rating {
  position: absolute;
  top: 34vw;
  right: 0px;
  min-width: 7.5vw;
  height: 2vw;
  font-size: 0.9rem;
  color: white;
  border-left: 1.5px white solid;
  background-color: rgba(31, 31, 31, 0.25);
  display: flex;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
/* HERO WALLPAER TITLE OR DESCRIPTION */
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
}
@media only screen and (max-width: 1000px) {
  .fillContent p {
    font-size: 0.8rem;
  }
  #rating {
    font-size: 0.9rem;
  }
}
@media only screen and (max-width: 850px) {
  #buttonDiv {
    top: 38vw;
    left: 60px;
  }
  #buttonDiv button {
    font-size: 0.7rem;
    min-height: 2vw;
  }
}
@media only screen and (max-width: 700px) {
  #rating {
    font-size: 0.7rem;
  }
  .fillContainer {
    min-height: 48vw;
    max-height: 50vw;
  }
  .fillContent p {
    font-size: 0.6rem;
  }
  #buttonDiv {
    top: 38vw;
    left: 60px;
    min-width: 160px;
  }
  #buttonDiv button {
    font-size: 0.7rem;
    min-height: 1.7vw;
    min-width: 60px;
  }
  #infoButton {
    width: 90px;
  }
}
</style>
