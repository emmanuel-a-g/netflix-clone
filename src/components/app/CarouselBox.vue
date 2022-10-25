<template>
  <div
    class="theBox"
    :style="{
      left: theIdx === 0 ? '0%' : theIdx === total - 1 ? 'unset' : '-20%',
      right: theIdx === total - 1 ? '0' : 'unset',
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
      <div v-else class="iframeContainer">
        <iframe
          :src="`https://www.youtube-nocookie.com/embed/${theMovieId}?start=5&end=38&autoplay=1&loop=1&modestbranding=1&autohide=1&showinfo=0rel=0&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1${muteControl}`"
          height="500"
          width="400"
          title=""
          allow="autoplay"
          frameborder="0"
        ></iframe>
      </div>
      <div class="contentDiv">
        <div class="actions">
          <div class="actionsLeft">
            <p
              :style="{ 'background-color': 'white' }"
              @click="toWatch"
              id="redHover"
            >
              <img id="play" :src="play" alt="play button" />
            </p>
            <p><img id="like" :src="like" alt="like button" /></p>
            <p v-if="!liked" @click="addToMylist">
              <img id="more" :src="plus" alt="more button" />
            </p>
            <p v-else @click="removeFromMyList">
              <img
                id="like"
                :src="whiteCheckmark"
                alt="whiteCheckmark button"
              />
            </p>
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
          <p>{{ computeTag(1) }}</p>
          &#8226;
          <p>{{ computeTag(2) }}</p>
          &#8226;
          <p>{{ computeTag(3) }}</p>
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
import whiteCheckmark from "../../assets/whiteCheckmark.png";
export default {
  props: [
    "show",
    "theIdx",
    "theMovie",
    "total",
    "identifier",
    "mobileDetected",
    "mylist",
  ],
  emits: ["closeCard"],
  data() {
    return {
      showMovie: false,
      muteControl: "&muted=1",
      timer: null,
      videoTimer: null,
      liked: false,
      play,
      like,
      plus,
      downArr,
      whiteCheckmark,
    };
  },
  computed: {
    theMovieId() {
      return this.theMovie ? this.theMovie.videoId : "";
    },
  },
  methods: {
    computeTag(pos) {
      if (this.theMovie.tags) {
        if (pos === 1) {
          return this.theMovie.tags[0];
        } else if (pos === 2) {
          return this.theMovie.tags[1];
        } else {
          return this.theMovie.tags[2];
        }
      } else {
        if (pos == 1) {
          return "New";
        } else if (pos === 2) {
          return "Action";
        } else {
          return "Family";
        }
      }
    },
    removeFromMyList() {
      this.liked = false;
      this.$store.dispatch("removeFromMyList", {
        profile: this.identifier,
        videoId: this.theMovie.id,
      });
    },
    addToMylist() {
      this.liked = true;
      if (!this.identifier) {
        this.$router.replace("/selectuser");
      } else {
        this.$store.dispatch("addMyList", {
          profile: this.identifier,
          videoId: this.theMovie.id,
        });
      }
    },
    cancelTimer() {
      if (this.mobileDetected) {
        return;
      }
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
      if (this.mobileDetected) {
        return;
      }
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
  beforeUnmount() {
    if (this.videoTimer) {
      this.showMovie = false;
      clearTimeout(this.videoTimer);
      this.videoTimer = null;
    }
  },
  mounted() {
    if (this.mylist) {
      this.liked = true;
    }
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
  top: -20%;
  width: 140%;
  height: 140%;
  -webkit-transition: -webkit-transform 300ms;
  transition: all 300ms ease;
  /* Z INDEX PLACEMENT */
  z-index: 21;
  border-radius: 4px;
}
.hiddenClass {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 100%;
  height: 0%;
  background-color: #141414;
  visibility: hidden;
  border-radius: 4px;
}
.contentDiv {
  grid-row: 2 / span 1;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  margin-top: 5px;
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
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
  border-radius: 4px;
  position: relative;
  display: grid;
  grid-template-rows: 60% 40%;
}
.movieDiv img {
  width: 100%;
  height: auto;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.movieDiv {
  grid-row: 1 / span 1;
  width: 100%;
  height: 100%;
  background-color: #0f0f0f;
  overflow: hidden;
}
/* IFRAME CSS */
.iframeContainer {
  position: relative;
  width: 100%;
  grid-row: 1 / span 1;
  height: 100%;
  /* height: 158px; */
  overflow: hidden;
  padding: 0;
  margin: 0;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
.iframeContainer iframe {
  position: absolute;
  padding: 0;
  margin: 0;
  bottom: -168px;
  left: -10%;
  height: 520px;
  width: 110%;
  border-radius: 4px;
  /* MOBILE REQUIRED */
  /* pointer-events: none; */
  z-index: 14;
}
.iframeContainer iframe:hover {
  /* MOBILE REQUIRED */
  pointer-events: none !important;
}
#redHover {
  border-color: white;
}
#redHover:hover {
  border-color: grey;
}
@media only screen and (max-width: 400px) {
  .tags {
    visibility: hidden;
  }
}
</style>
