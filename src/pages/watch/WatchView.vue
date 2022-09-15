<template>
  <div class="watchDiv">
    <img @click="goBack" :src="arrVideo" alt="goBack" class="visibleClass" />
    <div class="iframeContainer" v-if="show">
      <iframe
        ref="theIframe"
        :src="`https://www.youtube-nocookie.com/embed/${videoId}?start=5&end=65&autoplay=1&loop=1&modestbranding=1&autohide=1&showinfo=0rel=0&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1&muted=1`"
        height="100%"
        width="100%"
        title=""
        allow="autoplay"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script>
import arrVideo from "../../assets/arrVideo.png";
export default {
  data() {
    return {
      videoId: "",
      show: true,
      showArrow: true,
      videoTimer: null,
      fakeTimer: null,
      arrVideo,
    };
  },
  computed: {
    theVideoId() {
      if (!this.videoId) {
        return "";
      } else {
        return this.videoId;
      }
    },
  },
  methods: {
    startVideoTimer() {
      this.videoTimer = setTimeout(() => {
        this.cancelVideoTimer();
      }, 60500);
    },
    cancelVideoTimer() {
      if (this.videoTimer) {
        clearTimeout(this.videoTimer);
        this.videoTimer = null;
        this.show = false;
        //reset programatically;
        this.fakeTimer = setTimeout(() => {
          this.show = true;
          this.startVideoTimer();
        }, 1000);
      }
    },
    goBack() {
      this.$router.back();
    },
  },
  mounted() {
    //GET YOUTUBE ID
    const videoId = this.$route.params.videoId;
    this.videoId = videoId;
    this.startVideoTimer();
  },
  beforeUnmount() {
    if (this.videoTimer) {
      clearTimeout(this.videoTimer);
    }
  },
};
</script>

<style scoped>
.watchDiv {
  height: 100vh;
  width: 100%;
  background-color: black;
  position: relative;
}
.visibleClass {
  position: absolute;
  z-index: 21;
  top: 3%;
  left: 3%;
  height: 50px;
  width: 50px;
  visibility: visible;
  transition: all 300ms ease;
}
.visibleClass:hover {
  cursor: pointer;
}
/* .hiddenClass {
  position: absolute;
  z-index: 19;
  top: 3%;
  left: 3%;
  width: 0;
  height: 0;
  visibility: hidden;
} */
.iframeContainer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.iframeContainer iframe {
  left: -23%;
  top: -23%;
  position: absolute;
  padding: 0;
  margin: 0;
  width: 146%;
  height: 146%;
  z-index: 20;
  /* MOBILE REQUIRED */
  /* pointer-events: none; */
}
</style>
