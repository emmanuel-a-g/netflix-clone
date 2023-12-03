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
      :mylist="true"
    ></TheCarousel>
  </div>
</template>

<script>
import TheCarousel from "../../components/ui/TheCarousel.vue";
import { getMyListMovies } from "../../store/data";
import { divide, combineNew } from "../../utils/index";
import { mapGetters } from "vuex";

export default {
  props: ["cards", "identifier"],
  emits: ["hideList"],
  components: {
    TheCarousel,
  },

  data() {
    return {
      index: 0,
      showIndicators: false,
      indicators: [],
      bigList: [],
      myListIds: [],
    };
  },

  computed: {
    ...mapGetters({
      myList: "getMyList",
    }),
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
      if (!list) {
        return;
      }
      const bigList = divide(list, this.cards);
      this.bigList = bigList;
    },

    handleMyList() {
      const allLists = this.myList || [];
      const mylist = allLists[this.identifier];
      if (mylist && mylist.length) {
        this.myListIds = mylist;
        let divisor = this.cards;
        let lists = Math.ceil(mylist.length / divisor);
        const indicatorsList = new Array(lists).fill(0);
        this.indicators = indicatorsList;
        const myListMovies = getMyListMovies(mylist);
        this.setMyList(myListMovies);
      } else {
        this.$emit("hideList");
      }
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
    this.handleMyList();
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
