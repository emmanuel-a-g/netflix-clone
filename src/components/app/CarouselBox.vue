<template>
  <div
    class="theBox"
    :style="{
      left: theIdx === 0 ? '0%' : '-15%',
    }"
    :class="{ visibleClass: show, hiddenClass: !show }"
    @mouseleave="handleDoubleClose"
  >
    <div class="insideBox">
      <div
        class="movieDiv"
        v-if="!showMovie"
        @mouseover="startTimer"
        @mouseout="cancelTimer"
      >
        <img :src="theMovie ? theMovie.imageUrl : ''" alt="hover image" />
      </div>
      <div v-if="showMovie" class="iframeContainer" @click="toWatch">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${theMovieId}?start=5&end=38&autoplay=1&loop=1&modestbranding=1&autohide=1&showinfo=0rel=0&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1${muteControl}`"
          height="500"
          width="400"
          title=""
          allow="autoplay"
          frameborder="0"
        ></iframe>
      </div>
      <!-- :style="{ height: showMovie ? '100px' : '115px' }" -->
      <div class="contentDiv">
        <div class="actions">
          <div class="actionsLeft">
            <p
              :style="{ 'background-color': 'white', 'border-color': 'white' }"
              @click="toWatch"
            >
              <img id="play" :src="play" alt="play button" />
            </p>
            <p><img id="like" :src="like" alt="like button" /></p>
            <p><img id="more" :src="plus" alt="more button" /></p>
          </div>
          <div>
            <p><img id="down" :src="downArr" alt="info button" /></p>
          </div>
        </div>
        <div class="information">
          <p class="green">New</p>
          <p class="rating">TV-MA</p>
          <p>1h</p>
          <p class="hd">HD</p>
        </div>
        <div class="tags">
          <p>Exciting</p>
          &#8226;
          <p>Fun</p>
          &#8226;
          <p>Suspense</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import play from "../../assets/play.png";
import like from "../../assets/like.png";
import plus from "../../assets/plus.png";
import downArr from "../../assets/downArr.png";
export default {
  props: ["show", "theIdx", "theMovie"],
  emits: ["closeCard"],
  data() {
    return {
      showMovie: false,
      muteControl: "&muted=1",
      timer: null,
      videoTimer: null,
      play,
      like,
      plus,
      downArr,
    };
  },
  computed: {
    theMovieId() {
      return this.theMovie ? this.theMovie.videoId : "";
    },
  },
  methods: {
    cancelTimer() {
      if (this.timer && !this.showMovie) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    handleOpen() {
      this.showMovie = true;
      this.startVideoTimer();
    },
    startTimer() {
      if (!this.showMovie && !this.timer) {
        this.timer = setTimeout(() => {
          this.handleOpen();
        }, 1000);
      }
    },
    handleDoubleClose() {
      this.showMovie = false;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.$emit("closeCard");
    },
    toWatch() {
      this.$router.push(`/watch/${this.theMovieId}`);
    },
    startVideoTimer() {
      if (this.showMovie) {
        this.videoTimer = setTimeout(() => {
          this.cancelVideoTimer();
        }, 31500);
      }
    },
    cancelVideoTimer() {
      if (this.videoTimer || this.showMovie) {
        this.showMovie = false;
        clearTimeout(this.videoTimer);
        this.videoTimer = null;
      }
    },
  },
};
</script>

<style scoped>
.theBox {
  height: 100%;
}
.visibleClass {
  position: absolute;
  background-color: #0f0f0f;
  visibility: visible;
  top: -70%;
  width: 282px;
  height: 285px;
  transition: all 300ms ease;
  /* Z INDEX PLACEMENT */
  z-index: 20;
  border-radius: 4px;
}
.hiddenClass {
  position: absolute;
  top: 0%;
  width: 270px;
  height: 220px;
  left: 5%;
  background-color: #141414;
  visibility: hidden;
  border-radius: 4px;
}
.contentDiv {
  top: 158px;
  width: 282px;
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 15;
  height: 120px;
  padding-top: 5px;
  background-color: #0f0f0f;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
#play {
  width: 17px;
  height: 17px;
}
#like {
  width: 17px;
  height: 17px;
}
#more {
  width: 17px;
  height: 17px;
}
#down {
  width: 17px;
  height: 17px;
}
.actions {
  flex: 1;
  margin: 0px 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-left: 12px;
}
.actionsLeft {
  display: flex;
  gap: 8px;
}
.actions p {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
  padding: 0;
  margin: 0;
  border: 2px solid rgb(140, 139, 139);
}
.actions p:hover {
  border: 2px solid white;
}
.information {
  flex: 1;
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  margin-left: 3px;
}
.information p {
  padding: 0;
  margin: 0;
}
.green {
  font-size: 1rem;
  color: rgb(19, 185, 19);
}
.information .rating {
  border: 1px solid grey;
  padding: 0px 6px;
  margin: 0;
  height: 20px;
}
.information .hd {
  border: 1px solid grey;
  font-size: 0.8rem;
  padding: 0px 5px;
  margin: 0;
  border-radius: 5px;
  height: 15px;
}
.tags {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  margin-left: 12.5px;
}
.tags p {
  padding: 0;
  margin: 0;
}
.insideBox {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
  border-radius: 4px;
  position: relative;
}
.movieDiv img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.movieDiv {
  width: 100%;
  height: auto;
}
/* IFRAME CSS */
.iframeContainer {
  /* background-color: aquamarine; */
  /* border: 1px solid white; */
  position: relative;
  width: 282px;
  height: 158px;
  overflow: hidden;
  padding: 0;
  margin: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
/* .touchableOverlay {
  padding: 0;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 4px;
} */
.iframeContainer iframe {
  position: absolute;
  padding: 0;
  margin: 0;
  bottom: -168px;
  left: -21%;
  /* width: 100%;
  height: 100%; */
  height: 500px;
  width: 400px;
  border-radius: 4px;
  /* MOBILE REQUIRED */
  pointer-events: none;
  z-index: 14;
}
.iframeContainer iframe:hover {
  /* MOBILE REQUIRED */
  pointer-events: none !important;
}
</style>
