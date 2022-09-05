<template>
  <div class="content">
    <div class="imgDiv">
      <div>
        <img :src="logo" alt="netflix logo" />
      </div>
    </div>
    <div class="navBar">
      <ul>
        <li>Home</li>
        <li>Account</li>
        <li>Image</li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/netflix.png";
export default {
  data() {
    return {
      logo,
    };
  },
};
</script>

<style scoped>
.content {
  min-height: 8vh;
  display: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 12% auto 30%;
  grid-template-rows: 1pt;
}
.navBar {
  grid-column: 3 / span 1;
  width: 100%;
  height: 8vh;
}
.navBar li {
  list-style: none;
  flex: 1;
  text-align: center;
}
.navBar ul {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
}
.imgDiv {
  grid-column: 1 / span 1;
  display: flex;
  justify-content: center;
}
.imgDiv div {
  height: 100%;
}
.imgDiv img {
  width: 140px;
  height: auto;
  margin-top: -2vh;
}
@media only screen and (max-width: 700px) {
  .content {
    display: grid;
    grid-template-columns: 25% auto;
    grid-template-rows: 1pt;
  }
  .imgDiv img {
    width: 100px;
    height: auto;
    margin-top: -5px;
  }
  .navBar {
    grid-column: 2 / span 1;
  }
}
@media only screen and (max-width: 950px) {
  .content {
    grid-template-columns: 20% auto;
  }
}
</style>
