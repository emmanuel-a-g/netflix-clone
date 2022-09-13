<template>
  <div
    class="theBox"
    :style="{
      left: theIdx === 0 ? '0%' : '-14%',
    }"
    :class="{ visibleClass: show, hiddenClass: !show }"
  >
    <div class="insideBox">
      <div class="movieDiv">
        <img :src="theMovie ? theMovie.imageUrl : ''" alt="hover image" />
      </div>
      <div class="contentDiv">
        <p>Movie title</p>
        <p>fun, comedy, sci-fi</p>
        <p>Like, dislike, my list</p>
        <p>thumbs up, thumns down</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show", "theIdx", "theMovie", "closeBox"],
};
</script>

<style scoped>
.theBox {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.visibleClass {
  position: absolute;
  background-color: #141414;
  visibility: visible;
  top: -70%;
  width: 270px;
  height: 285px;
  transition: all 300ms ease;
  z-index: 5;
  border-radius: 4px;
}
.hiddenClass {
  position: absolute;
  top: 0%;
  width: 270px;
  height: 200px;
  left: 5%;
  background-color: #141414;
  visibility: hidden;
  border-radius: 4px;
}
.movieDiv {
  width: 100%;
  height: auto;
}
.contentDiv {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 43%;
  text-align: left;
}
.contentDiv p {
  margin: 0;
  padding: 0;
}
.insideBox {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 126px;
  height: auto;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  position: relative;
}
.insideBox img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
