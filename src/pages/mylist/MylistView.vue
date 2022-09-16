<template>
  <div class="wrapper">
    <TheBrowseNav class="navbar"></TheBrowseNav>
    <div :class="{ openSelection: open, closeSelection: !open }">
      <div class="insideSelection">
        <h2>{{ selectedMovie.title || "" }}</h2>
        <div class="movieView">
          <div>
            <img
              @click="watchNow(selectedMovie.videoId)"
              :src="selectedMovie.imageUrl || ''"
              :alt="selectedMovie.title || ''"
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
      <div v-if="bigList.length === 0">
        <h4>Nothing Added to My List</h4>
      </div>
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
</template>

<script>
import { getMyListMovies } from "../../store/data";
import { divideMylist } from "../../utils/index";
import TheBrowseNav from "../browse/TheBrowseNav.vue";
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
      myListIds: [],
      myList: [],
      bigList: [],
      open: false,
      selectedMovie: "",
      identifier: "",
      cardsNum: 6,
    };
  },
  watch: {
    cardsNum() {
      if (this.myListIds && this.myListIds.length) {
        this.setMyList();
      }
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
      this.selectedMovie = "";
    },
    addToMyList() {
      this.$store.dispatch("addMyList", {
        profile: this.identifier,
        videoId: this.selectedMovie.id,
      });
    },
    removeFromList() {
      this.$store.dispatch("removeFromMyList", {
        profile: this.identifier,
        videoId: this.selectedMovie.id,
      });
      this.fetchMyList();
      this.toggleCancel();
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
        width > breakpointTwo &&
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
    fetchMyList() {
      this.$store
        .dispatch("fetchMyList")
        .then((res) => {
          const mylist = res.mylist[this.identifier];
          this.myListIds = mylist;
          if (mylist && mylist.length) {
            const myListMovies = getMyListMovies(mylist);
            this.myList = myListMovies;
            this.setMyList(myListMovies);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.identifier = this.$route.query.identifier;
    this.fetchMyList();
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
  gap: 5px;
  border: 1px solid transparent;
  width: 100%;
}
.wagon {
  width: 100%;
  border: 1px solid transparent;
  height: 170px;
}
.wagon img {
  width: 98%;
  height: auto;
  border-radius: 5px;
  border: 2.5px solid transparent;
}
.wagon img:hover {
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
  .wagon img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 1rem;
  }
  .headerRight img {
    width: 60px;
    height: auto;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 550px) {
  .movieView {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
  .wagon img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 0.7rem;
  }
}
@media only screen and (max-width: 450px) {
  .movieView {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
  .wagon img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 0.5rem;
  }
  .headerRight img {
    width: 60px;
    height: auto;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 1000px) {
  .wagon {
    height: 125px;
  }
}
@media only screen and (max-width: 350px) {
  .content {
    overflow-x: scroll;
  }
}
</style>
