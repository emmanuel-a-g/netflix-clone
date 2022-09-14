<template>
  <div class="wrapper">
    <img class="logo" :src="netflix" alt="netflix logo" />
    <div class="space"></div>
    <!-- SHOW CURRENT NAME AND PROFILE IMAGE -->
    <div class="currentDiv">
      <div class="header">
        <div class="headerLeft">
          <div class="icon">&#8592;</div>
          <div>
            <h1>Edit Profile</h1>
            <h4>Choose a profile icon.</h4>
          </div>
        </div>
        <div class="headerRight">
          <p>EmmanuelG</p>
          <img
            src="https://res.cloudinary.com/milito/image/upload/v1663140262/profiles/classicTwo_et85sp.png"
            alt="theImg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import netflix from "../../assets/netflix.png";
export default {
  data() {
    return {
      netflix,
    };
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  font-size: 1rem;
  color: black;
  background-color: #141414;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo {
  position: absolute;
  width: 130px;
  height: auto;
  left: 3vw;
  top: 1vh;
  z-index: 18;
}
.space {
  background-color: transparent;
  height: 12vh;
  width: 100%;
}
.currentDiv {
  width: 85%;
  height: 88vh;
  background-color: #141414;
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.headerLeft {
  color: white;
  display: flex;
  line-height: normal;
}
.icon {
  font-size: 2.5rem;
  margin: 0 5px;
  font-weight: bolder;
}
.headerLeft h1 {
  padding: 0;
  margin: 0;
  font-size: 2.4rem;
  text-align: left;
}
.headerLeft h4 {
  padding: 0;
  margin: 0;
  font-size: 1.7rem;
  text-align: left;
}
.headerRight {
  display: flex;
  font-size: 1rem;
}
.headerRight p {
  font-size: 1.6rem;
  margin-right: 10px;
  color: white;
  font-weight: bold;
}
.headerRight img {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
</style>
