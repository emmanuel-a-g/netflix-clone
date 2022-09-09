<template>
  <div class="noWrap">
    <div class="headerCarousel">
      <h2>{{title}}</h2>
      <div
        class="label"
        :style="{ visibility: showIndicators ? 'visible' : 'hidden' }"
      >
        <p v-for="(item, idx) in list" :key="item">
          <span :class="{ activeLabel: index === idx }">&#9866;</span>
        </p>
      </div>
    </div>
    <TheCarousel
      :list="list"
      :bigList="bigList"
      @updateIdx="updateIdx"
      :showIndicators="showIndicators"
      @mouseenter="show"
      @mouseleave="unshow"
    ></TheCarousel>
  </div>
</template>

<script>
import TheCarousel from "../../components/ui/TheCarousel.vue";
import { divideListEquallyBy } from "../../utils/index";
import { data, data2 } from "../../store/data";
export default {
  props: ["listNumber", "title"],
  components: {
    TheCarousel,
  },
  data() {
    return {
      index: 0,
      showIndicators: false,
      list: [],
      bigList: [],
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
  },
  beforeMount() {
    // TO-DO FILL IN THE EMPTY ONES OF UNEVEN PAIRS!!!
    let list;
    if (!this.listNumber || this.listNumber === 1) {
      list = data;
    } else {
      list = data2;
    }
    //create an equally divided list of lists
    let divisor = 5;
    let lists = Math.ceil(list.length / divisor);
    const indicatorsList = new Array(lists).fill(0);
    this.list = indicatorsList;
    const dividedList = divideListEquallyBy(list, divisor);
    //save to state
    this.bigList = dividedList;
  },
};
</script>

<style scoped>
/* unique nowrap */
.noWrap {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
/* unique nowrap */
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
    font-size: .8rem;
  }
}
</style>
