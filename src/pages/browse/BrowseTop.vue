<template>
  <div class="wrapper">
    <div class="fillContainer">
      <img id="heroTitle" :src="getHeroTitleImage" alt="hero title image" />
      <div class="fillContent">
        <p>{{ getHeroDescription }}</p>
        <div id="buttonDiv">
          <button id="playButton" @click="toWatch">
            <img :src="play" alt="play icon" /> Play
          </button>
          <button id="infoButton">
            <img :src="info" alt="info icon" />More Info
          </button>
        </div>
        <div class="ratingDiv">
          <span id="rating">{{ getHeroRating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import play from "../../assets/play.png";
import info from "../../assets/info.png";
export default {
  props: ["hero"],
  data() {
    return {
      play,
      info,
      videoId: "",
    };
  },
  computed: {
    getHeroTitleImage() {
      return this.hero ? this.hero.heroTitleImage : "";
    },
    getHeroDescription() {
      return this.hero ? this.hero.description : "";
    },
    getHeroRating() {
      return this.hero ? this.hero.rating : "";
    },
  },
  methods: {
    toWatch() {
      this.$router.push(`/watch/${this.videoId}`);
    },
  },
  mounted() {
    this.videoId = this.hero.videoId;
  },
};
</script>

<style scoped>
/* background-color: #141414 */
.wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  font-size: 18px;
}
#heroTitle {
  position: absolute;
  top: 12.5vw;
  left: 60px;
  width: 32vw;
  height: auto;
}
.fillContainer {
  /* smaller for inner padding */
  margin-top: 26.5%;
  max-height: 20vw;
  /* smaller for inner padding */
  display: flex;
  flex-direction: column;
  width: 100%;
}
.fillContent {
  margin-left: 3vw;
  font-size: inherit;
}
.fillContent p {
  width: 30%;
  word-wrap: normal;
  font-size: 1.1em;
  margin: 0;
  margin-top: 3px;
  padding: 0;
}
#buttonDiv {
  display: flex;
  background-color: transparent;
  margin-top: 1em;
  font-size: 18px;
}
#buttonDiv button {
  border: none;
  border-radius: 5px;
  font-size: 1em;
  font-weight: bold;
  min-height: 1em;
}
#playButton {
  width: 6em;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  color: black;
  margin-right: 1.5em;
}
#playButton img {
  width: 1em;
  height: auto;
}
#infoButton {
  width: 8em;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  background-color: rgba(100, 100, 100, 0.364);
}
#infoButton img {
  width: 1em;
  height: auto;
  margin-right: 2px;
}
.ratingDiv {
  display: flex;
  justify-content: flex-end;
}
#rating {
  min-width: 8vw;
  min-height: 3vw;
  font-size: 1em;
  color: white;
  border-left: 1.5px white solid;
  background-color: rgba(31, 31, 31, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
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
    font-size: 0.8em;
  }
  #buttonDiv button {
    height: 2em;
  }
  #rating {
    font-size: 0.8em;
  }
}
@media only screen and (max-width: 700px) {
  #rating {
    font-size: 0.5em;
  }
  .fillContent p {
    font-size: 0.6em;
    width: 40%;
  }
  #heroTitle {
    left: 25px;
  }
  #buttonDiv {
    margin-top: 5px;
  }
  #buttonDiv button {
    height: 1.5em;
    font-size: .8em;
  }
  #playButton {
    min-width: 2em;
  }
  #infoButton {
    min-width: 2em;
  }
}
@media only screen and (max-width: 450px) {
  .fillContent p {
    font-size: 0.5em;
    width: 50%;
  }
  #rating {
    font-size: 0.4em;
  }
  #buttonDiv button {
    height: 0.8em;
    font-size: .6em;
  }
}
</style>
