<template>
  <div class="noWrap">
    <div class="headerCarousel">
      <h2>My List</h2>
      <div
        class="label"
        :style="{ visibility: showIndicators ? 'visible' : 'hidden' }"
      >
        <p v-for="(item, idx) in indicators" :key="item">
          <span :class="{ activeLabel: index === idx }">&#9866;</span>
        </p>
      </div>
    </div>
    <TheCarousel
      :indicators="indicators"
      :bigList="bigList"
      :showIndicators="showIndicators"
      @updateIdx="updateIdx"
      @mouseenter="show"
      @mouseleave="unshow"
    ></TheCarousel>
  </div>
</template>

<script>
import TheCarousel from "../../components/ui/TheCarousel.vue";
import { getMyListMovies } from "../../store/data";
import { divide, combineNew } from "../../utils/index";
export default {
  props: ["cards", "identifier"],
  emits: ["hideMyList"],
  components: {
    TheCarousel,
  },
  data() {
    return {
      index: 0,
      showIndicators: false,
      indicators: [],
      bigList: [],
      myList: [],
      myListIds: [],
    };
  },
  methods: {
    updateIdx(newIndex) {
      this.index = newIndex;
    },
    show() {
      this.showIndicators = true;
    },
    unshow() {
      this.showIndicators = false;
    },
    setMyList(list) {
      let bigList;
      if (!list) {
        bigList = divide(this.myList, this.cards);
        this.bigList = bigList;
      } else {
        bigList = divide(list, this.cards);
        this.bigList = bigList;
      }
    },
    fetchMyList() {
      this.$store
        .dispatch("fetchMyList")
        .then((res) => {
          const mylist = res.mylist[this.identifier.name];
          this.myListIds = mylist;
          if (mylist && mylist.length) {
            let divisor = this.cards;
            let lists = Math.ceil(mylist.length / divisor);
            const indicatorsList = new Array(lists).fill(0);
            this.indicators = indicatorsList;
            const myListMovies = getMyListMovies(mylist);
            this.myList = myListMovies;
            this.setMyList(myListMovies);
          } else {
            this.$emit("hideMyList");
            this.myListIds = [];
            this.mylist = [];
            this.bigList = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    cards(newDivisor) {
      let totalMovies = this.myList;
      let lists = Math.ceil(totalMovies.length / newDivisor);
      this.indicators = new Array(lists).fill(0);
      this.bigList = combineNew(this.bigList, newDivisor);
    },
  },
  mounted() {
    if (this.identifier.name.length) {
      this.fetchMyList();
    }
  },
};
</script>

<style scoped>
.noWrap {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
.headerCarousel {
  display: flex;
  justify-content: space-between;
  margin: 0px 60px;
}
.headerCarousel h2 {
  margin: 5px 0px;
  font-size: 1.3rem;
}
/* show progress */
.label {
  display: flex;
  width: 80px;
  justify-content: space-evenly;
  align-items: center;
}
.label p {
  font-size: 2rem;
  color: grey;
  padding: 0;
  margin: 0;
}
.activeLabel {
  font-size: 2rem;
  padding: 0;
  margin: 0;
  color: white;
}
@media only screen and (max-width: 500px) {
  .headerCarousel h2 {
    font-size: 0.8rem;
  }
}
</style>
