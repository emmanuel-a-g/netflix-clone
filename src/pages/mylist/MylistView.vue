<template>
  <div class="wrapper">
    <TheBrowseNav class="navbar"></TheBrowseNav>
    <div :class="{ openSelection: open, closeSelection: !open }">
      <div class="insideSelection">
        <h2>{{ (selectedMovie && selectedMovie.title) || "" }}</h2>
        <div class="movieView">
          <div>
            <img
              @click="watchNow(selectedMovie.videoId)"
              :src="(selectedMovie && selectedMovie.imageUrl) || ''"
              :alt="(selectedMovie && selectedMovie.title) || ''"
            />
          </div>
        </div>
        <div class="buttons">
          <button @click="removeFromList" class="buttonTwo">Remove</button>
          <button @click="toggleCancel" class="buttonOne">Cancel</button>
        </div>
      </div>
    </div>
    <div class="mainContent">
      <div class="header">
        <h1>My List</h1>
      </div>
      <div v-if="!doesListHaveMovies">
        <h4>Nothing Added to My List</h4>
      </div>
      <div v-if="doesListHaveMovies">
        <div class="train" v-for="(list, index) in bigList" :key="index">
          <div class="wagon" v-for="(mov, idx) in list" :key="idx">
            <div
              class="card"
              :style="{ visibility: mov.id ? 'visible' : 'hidden' }"
            >
              <img
                @click="toggleOpen(mov)"
                :src="`${mov.imageUrl ? mov.imageUrl : ''}`"
                alt="profile image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMyListMovies } from "../../store/data";
import { divideMylist } from "../../utils/index";
import TheBrowseNav from "../browse/TheBrowseNav.vue";
import { mapGetters } from "vuex";
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
      open: false,
      selectedMovie: null,
      cardsNum: 6,
    };
  },

  computed: {
    ...mapGetters({
      myList: "getMyList",
      inheritedIdentifier: "getIdentifier",
    }),

    identifier() {
      return (
        ((this.$route || {}).query || {}).identifier ||
        this.inheritedIdentifier ||
        null
      );
    },

    doesListHaveMovies() {
      return (this.bigList || [[]])[0].length >= 1;
    },

    bigList() {
      const identifier = this.identifier;
      const allLists = this.myList;
      const def = [[]];
      if (!identifier || !allLists) {
        return def;
      }

      const mylist = allLists[identifier];
      if (!mylist || !(mylist || []).length) {
        return def;
      }

      const myListMovies = getMyListMovies(mylist);
      return divideMylist(myListMovies, this.cardsNum);
    },
  },

  methods: {
    watchNow(movieId) {
      this.$router.push(`/watch/${movieId}`);
    },

    toggleOpen(mov) {
      this.open = true;
      this.selectedMovie = mov;
    },

    goBack() {
      this.$router.back();
    },

    toggleCancel() {
      this.open = false;
      this.selectedMovie = null;
    },

    addToMyList() {
      this.$store.dispatch("addMyList", {
        profile: this.identifier,
        videoId: this.selectedMovie.id,
      });
    },

    removeFromList() {
      this.$store.dispatch("removeFromMyList", {
        identifier: this.identifier,
        videoId: this.selectedMovie.id,
      });

      this.toggleCancel();
    },

    setMargins() {
      let width = window.innerWidth;
      const cardsNum = this.cardsNum;
      if (width > breakpointSix && cardsNum === 6) {
        return;
      } else if (
        width < breakpointSix &&
        width > breakpointFive &&
        cardsNum !== 5
      ) {
        this.cardsNum = 5;
      } else if (
        width < breakpointFive &&
        width > breakpointFour &&
        cardsNum !== 4
      ) {
        this.cardsNum = 4;
      } else if (
        width < breakpointFour &&
        width > breakpointThree &&
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
      } else if (width < breakpointTwo && cardsNum !== 2) {
        this.cardsNum = 2;
      }
    },

    fetchIt() {
      this.$store.dispatch("fetchMyList").catch((err) => {
        console.error(err);
      });
    },
  },

  mounted() {
    this.fetchIt();
    window.addEventListener("resize", this.setMargins);
    this.setMargins();
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
  min-height: 100vh;
  background-color: #141414;
  min-width: 350px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  width: 130px;
  height: auto;
  margin-top: -14px;
}
.mainContent {
  width: 85%;
  margin-top: 8vh;
  display: flex;
  flex-direction: column;
}
.train {
  display: flex;
  gap: 10px;
  border: 1px solid transparent;
  width: 100%;
}
.wagon {
  width: 100%;
  border: 1px solid transparent;
  height: 170px;
}
.card {
  flex: 1;
  width: 100%;
}
.card img {
  width: 90%;
  height: auto;
  border-radius: 5px;
  border: 2.5px solid transparent;
}
.card img:hover {
  border: 2.5px solid white;
}
.openSelection {
  visibility: visible;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 18;
  background-color: #141414;
  height: 100%;
  color: white;
}
.closeSelection {
  visibility: hidden;
  height: 0;
  width: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 18;
}
.insideSelection {
  text-align: center;
  width: 370px;
}
.movieView {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 370px;
  height: 245px;
  border-bottom: 0.5px solid rgb(79, 79, 79);
  border-top: 0.5px solid rgb(79, 79, 79);
}
.movieView img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  border: 2.5px solid transparent;
}
.movieView img:hover {
  border: 2.5px solid white;
}
#arrow {
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
}
#arrow:hover {
  border: 1px solid transparent;
}
.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.buttonOne,
.buttonTwo {
  width: 130px;
  height: 40px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 5px;
  border: 1px solid transparent;
}
.buttonOne {
  background-color: white;
  color: black;
}
.buttonTwo {
  background-color: transparent;
  color: grey;
  border: 1px solid grey;
}
@media only screen and (max-width: 700px) {
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 1rem;
  }
}
@media only screen and (max-width: 550px) {
  .movieView {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
  .navbar {
    display: flex;
    justify-content: space-between;
  }
}
@media only screen and (max-width: 450px) {
  .movieView {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
}
@media only screen and (max-width: 1000px) {
  .wagon {
    height: 125px;
  }
}
@media only screen and (max-width: 350px) {
  .content {
    overflow-x: hidden;
  }
}
</style>
