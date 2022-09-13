<template>
  <div
    class="theBox"
    :style="{
      left: theIdx === 0 ? '0%' : '-15%',
    }"
    :class="{ visibleClass: show, hiddenClass: !show }"
  >
    <div class="insideBox">
      <div class="movieDiv">
        <img :src="theMovie ? theMovie.imageUrl : ''" alt="hover image" />
      </div>
      <div class="contentDiv">
        <div class="actions">
          <div class="actionsLeft">
            <p
              :style="{ 'background-color': 'white', 'border-color': 'white' }"
            >
              <img id="play" :src="play" alt="play button" />
            </p>
            <p><img id="like" :src="like" alt="like button" /></p>
            <p><img id="more" :src="plus" alt="more button" /></p>
          </div>
          <div>
            <p><img id="down" :src="downArr" alt="info button" /></p>
          </div>
        </div>
        <div class="information">
          <p class="green">New</p>
          <p class="rating">TV-MA</p>
          <p>1h</p>
          <p class="hd">HD</p>
        </div>
        <div class="tags">
          <p>Exciting</p>
          &#8226;
          <p>Fun</p>
          &#8226;
          <p>Suspense</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import play from "../../assets/play.png";
import like from "../../assets/like.png";
import plus from "../../assets/plus.png";
import downArr from "../../assets/downArr.png";
export default {
  props: ["show", "theIdx", "theMovie", "closeBox"],
  data() {
    return {
      play,
      like,
      plus,
      downArr,
    };
  },
};
</script>

<style scoped>
.theBox {
  height: 100%;
  position: relative;
}
.visibleClass {
  position: absolute;
  background-color: #0f0f0f;
  visibility: visible;
  top: -70%;
  width: 282px;
  height: 285px;
  transition: all 300ms ease;
  z-index: 10;
  border-radius: 4px;
}
.hiddenClass {
  position: absolute;
  top: 0%;
  width: 270px;
  height: 220px;
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
  /* flex: 1; */
  /* margin-top: 10px; */
  height: 115px;
  display: flex;
  flex-direction: column;
}
#play {
  width: 17px;
  height: 17px;
}
#like {
  width: 17px;
  height: 17px;
}
#more {
  width: 17px;
  height: 17px;
}
#down {
  width: 17px;
  height: 17px;
}
.actions {
  flex: 1;
  /* margin: 10px 0px; */
  margin: 0px 0px;
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-left: 12px;
}
.actionsLeft {
  display: flex;
  gap: 8px;
}
.actions p {
  border-radius: 50%;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #141414;
  padding: 0;
  margin: 0;
  border: 2px solid rgb(140, 139, 139);
}
.actions p:hover {
  border: 2px solid white;
}
.information {
  flex: 1;
  display: flex;
  width: 90%;
  justify-content: space-around;
  align-items: center;
  margin-left: 3px;
}
.information p {
  padding: 0;
  margin: 0;
}
.green {
  font-size: 1rem;
  color: rgb(19, 185, 19);
}
.information .rating {
  border: 1px solid grey;
  padding: 0px 6px;
  margin: 0;
  height: 20px;
}
.information .hd {
  border: 1px solid grey;
  font-size: 0.8rem;
  padding: 0px 5px;
  margin: 0;
  border-radius: 5px;
  height: 15px;
}
.tags {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 75%;
  margin-left: 12.5px;
}
.tags p {
  padding: 0;
  margin: 0;
}
.insideBox {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  padding: 0;
  margin: 0;
  border-radius: 4px;
  position: relative;
}
.movieDiv img {
  width: 100%;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}
</style>
