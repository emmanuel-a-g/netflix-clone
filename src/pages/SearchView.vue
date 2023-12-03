<template>
  <div class="wrapper">
    <TheBrowseNav @closeTheSearch="goBackHome" class="navbar"></TheBrowseNav>
    <div class="mainContent">
      <div class="middle">
        <p>Search: {{ movieQuery }}</p>
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
      cardsNum: 6,
      lastQuery: "",
      playWhite,
    };
  },

  watch: {
    cardsNum() {
      if (this.bigList[0].length > 1) {
        this.setMyList();
      }
    },

    $route(next) {
      const { q = "" } = next.query || {};
      this.handleNewSearch(q);
    },
  },

  computed: {
    movieQuery() {
      const { q } = this.$route.query || {};
      return q;
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

    handleNewSearch(newQuery = this.movieQuery) {
      if (newQuery === "") {
        this.$router.push({ path: "/browse" });
        return;
      }

      if (newQuery !== this.lastQuery) {
        const theResult = searchMovie(newQuery);
        if (!(theResult || []).length) {
          return;
        }
        this.myList = theResult;
        this.setMyList(theResult);
        this.lastQuery = newQuery;
      }
    },
  },

  mounted() {
    window.addEventListener("resize", this.setMargins);
    this.setMargins();
    this.handleNewSearch();
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
.card:hover {
  color: white;
}
.card p {
  text-align: center;
  font-size: 0.8rem;
}
.theTrainWrapper {
  padding: 0;
  margin: 0;
}
.middle img {
  width: 10px;
  height: 10px;
}
.middle {
  display: flex;
  justify-content: flex-start;
}
</style>
