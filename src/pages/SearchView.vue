<template>
  <div class="wrapper">
    <TheBrowseNav @closeTheSearch="goBackHome" class="navbar"></TheBrowseNav>
    <div class="mainContent">
      <div>
        <p>Search: {{ query }}</p>
      </div>
      <div v-if="bigList[0].length === 0">
        <p>0 results</p>
      </div>
      <div class="theTrainWrapper" v-if="bigList[0].length > 1">
        <div class="train" v-for="(list, index) in bigList" :key="index">
          <div class="wagon" v-for="(mov, idx) in list" :key="idx">
            <div
              class="card"
              :style="{ visibility: mov.id ? 'visible' : 'hidden' }"
            >
              <img
                class="imgLogo"
                :src="`${mov.imageUrl ? mov.imageUrl : ''}`"
                alt="profile image"
                @click="openMovie(mov)"
              />
              <span class="play" @click="openMovie(mov)"
                ><img :src="playWhite" alt="play"
              /></span>
              <p>{{ mov.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheBrowseNav from "../pages/browse/TheBrowseNav.vue";
import playWhite from "../assets/playWhite.png";
import { searchMovie, divideMylist } from "../utils/index";
let breakpointSix = 1200;
let breakpointFive = 1000;
let breakpointFour = 700;
let breakpointThree = 635;
let breakpointTwo = 500;
export default {
  components: {
    TheBrowseNav,
  },
  data() {
    return {
      myList: [],
      bigList: [[]],
      identifier: "",
      cardsNum: 6,
      query: "",
      playWhite,
    };
  },
  watch: {
    cardsNum() {
      if (this.bigList[0].length > 1) {
        this.setMyList();
      }
    },
  },
  methods: {
    goBackHome() {
      this.$router.push("/browse");
    },
    openMovie(mov) {
      this.$router.push({ path: `/watch/${mov.videoId}` });
    },
    setMargins() {
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
        width >= breakpointTwo &&
        this.cardsNum !== 2
      ) {
        this.cardsNum = 2;
      } else if (width > breakpointSix && this.cardsNum !== 6) {
        this.cardsNum = 6;
      } else if (width < breakpointTwo && this.cardsNum !== 2) {
        this.cardsNum = 2;
      }
    },
    setMyList(list) {
      if (!list) {
        this.bigList = divideMylist(this.myList, this.cardsNum);
      } else {
        this.bigList = divideMylist(list, this.cardsNum);
      }
    },
  },
  beforeMount() {
    this.query = this.$route.query.q;
  },
  mounted() {
    window.addEventListener("resize", this.setMargins);
    this.setMargins();
    const theResult = searchMovie(this.query);
    if (theResult.length > 0) {
      this.myList = theResult;
      this.setMyList(theResult);
    }
  },
  updated() {
    const newQuery = this.$route.query.q;
    const theResult = searchMovie(newQuery);
    if (newQuery !== this.query && theResult.length >= 1) {
      this.query = newQuery;
      this.myList = theResult;
      this.setMyList(theResult);
    } else if (newQuery === "") {
      this.$router.push({ path: "/browse" });
    } else {
      this.query = newQuery;
    }
  },
};
</script>

<style scoped>
.navbar {
  z-index: 7;
  position: fixed;
  min-height: 8vh;
  width: 100%;
  display: grid;
  grid-template-columns: 15% auto 35%;
  grid-template-rows: 1pt;
  transition: 500ms;
}
.wrapper {
  background-color: #141414;
  min-width: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.mainContent {
  margin-top: 15vh;
  width: 92%;
  display: flex;
  flex-direction: column;
  height: 100%;
  color: grey;
}
.train {
  display: flex;
  gap: 10px;
  border: 1px solid transparent;
  width: 100%;
}
.wagon {
  width: 100%;
}
.card {
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.imgLogo {
  width: 97%;
  height: 122px;
  border-radius: 5px;
  border: 2.5px solid transparent;
  cursor: pointer;
}
.imgLogo:hover {
  border: 2.5px solid white;
}
.card p {
  text-align: center;
  font-size: 0.8rem;
}
.theTrainWrapper {
  padding: 0;
  margin: 0;
}
.play {
  position: absolute;
  top: 29%;
  left: 43%;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  width: 26px;
  height: 26px;
  cursor: pointer;
  padding: 0 0 0 2px;
}
.play img {
  width: 13px;
  height: 13px;
}
</style>
