<template>
  <div class="theWall" :style="{ height: theHeight }">
    <div class="grid">
      <div
        class="left"
        :class="{
          leftColumn: textColumn,
          rightColumn: !textColumn,
        }"
        :style="{ height: theHeight }"
      >
        <h1>{{ data.title }}</h1>
        <h4>
          {{ data.description }}
        </h4>
      </div>
      <div
        class="right"
        :class="{
          leftColumn: imageColumn,
          rightColumn: !imageColumn,
        }"
        :style="{ height: theHeight }"
      >
        <img :src="'./images/' + data.image + '.png'" alt="idk" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["textSide", "imageSide", "imageName", "myHeight", "data"],
  data() {
    return {
      title: "Enjoy on your TV.",
      description:
        "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    };
  },
  computed: {
    theHeight() {
      if (!this.myHeight) {
        return 60 + "vh";
      }
      return +this.myHeight + "vh";
    },
    textColumn() {
      if (this.textSide === "left") {
        return true;
      } else {
        return false;
      }
    },
    imageColumn() {
      if (this.imageSide === "left") {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.theWall {
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}
.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1pt;
  width: 90%;
  height: 98%;
  background-color: black;
}
h1 {
  width: 75%;
}
h4 {
  width: 75%;
}
.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  text-align: left;
  z-index: 6;
}
.right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.right img {
  width: 480px;
  height: auto;
}
.leftColumn {
  grid-column: 1 / span 1;
}
.rightColumn {
  grid-column: 2 / span 1;
}
@media only screen and (max-width: 740px) {
  .left {
    font-size: 1rem;
  }
  .right img {
    width: 300px;
  }
}
@media only screen and (max-width: 550px) {
  .left {
    font-size: 0.75rem;
  }
  .right img {
    width: 210px;
  }
}
</style>
