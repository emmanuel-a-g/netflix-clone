<template>
  <div class="wrapper">
    <TheBrowseNav class="navbar"></TheBrowseNav>
    <div :class="{ openSelection: open, closeSelection: !open }">
      <div class="insideSelection">
        <h2>Movie Title</h2>
        <div class="movieView">
          <div>
            <p>Current</p>
          </div>
          <div>
            <p>arrow</p>
          </div>
          <div>
            <p>New</p>
          </div>
        </div>
        <div class="buttons">
          <button @click="addToMyList" class="buttonOne">Watch</button>
          <button @click="toggleCancel" class="buttonTwo">Remove</button>
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
              @click="toggleOpen(mov.id)"
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
      selectedImage: "",
      identifier: "",
      profile: "",
      imageId: "",
    };
  },
  computed: {},
  methods: {
    toggleOpen(id) {
      this.open = true;
      this.selectedMovie = id;
    },
    goBack() {
      this.$router.back();
    },
    toggleCancel() {
      this.open = false;
      this.selectedMovie = "";
    },
    addToMyList() {
      //CHANGE ADD/REMOVE FROM MY LIST
      this.$store.dispatch("addProfileImageId", {
        profile: this.identifier,
        imageId: this.selectedMovie,
      });
    },
  },
  mounted() {
    this.identifier = this.$route.query.identifier;
    this.$store
      .dispatch("fetchMyList")
      .then((res) => {
        this.myListIds = res.mylist[this.identifier];
        const myListMovies = getMyListMovies(res.mylist[this.identifier]);
        this.myList = myListMovies;
        this.bigList = divideMylist(myListMovies, 5);
      })
      .catch((err) => {
        console.log(err);
      });
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
.card {
  flex: 1;
}

.mainContent {
  width: 85%;
  margin-top: 8vh;
  display: flex;
  flex-direction: column;
}
.train {
  display: flex;
  justify-content: space-around;
  border: 1px solid transparent;
}
.wagon {
  width: 100%;
  height: 180px;
}
.wagon img {
  width: 100%;
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
.movieView p {
  margin: 10px 0;
  font-size: 0.9rem;
}
.movieView img {
  width: 140px;
  height: 140px;
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
@media only screen and (max-width: 350px) {
  .content {
    overflow-x: scroll;
  }
}
</style>
