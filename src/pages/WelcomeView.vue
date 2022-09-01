<template>
  <div class="welcomeDiv">
    <div class="welcomeImageDiv">
      <div class="navDiv">
        <div class="leftNav">
          <img :src="'./images/netflix.png'" alt="netflix logo" />
        </div>
        <div class="rightNav">
          <button class="leftButton">English</button>
          <button class="rightButton">Sign In</button>
        </div>
      </div>
      <div class="gradientDiv"></div>
      <div class="contentDiv">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <h5>
          Ready to watch? Enter your email to create or restart your membership.
        </h5>
        <div class="emailControl">
          <input type="text" placeholder="Email Address" v-model="email" />
          <button @click="submitEmail">Get Started</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import
export default {
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitEmail() {
      console.log("Email: ", this.email);
      //reset email
      //process something...
    },
  },
};
</script>

<style scoped>
.welcomeDiv {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.welcomeImageDiv {
  height: 98vh;
  background: url("~@/assets/netflix_home.jpeg") no-repeat center;
  background-size: cover;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  align-content: center;
}
.gradientDiv {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.556);
}
.contentDiv {
  position: absolute;
  width: 50vw;
  left: 25vw;
  top: 35vh;
  font-size: 1.5rem;
  z-index: 3;
}
.contentDiv h1,
.contentDiv h3 {
  margin: 0;
  padding: 0;
}
.contentDiv h5 {
  margin: 25px;
}
.navDiv {
  width: 100%;
  height: 13vh;
  top: 0;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 20% auto 24%;
  grid-template-rows: 1pt;
  z-index: 2;
}
.navDiv img {
  width: 180px;
  height: auto;
}
.leftNav {
  grid-column: 1 / span 1;
  height: inherit;
  margin-top: -1vh;
}
.rightNav {
  grid-column: 3 / span 1;
  height: inherit;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.rightNav button {
  width: 105px;
  height: 40px;
  border-radius: 5px;
  font-size: 1rem;
}
.leftButton {
  background-color: rgba(0, 0, 0, 0.738);
  color: white;
  border-color: #ffffff;
  border-width: 0.7px;
}
.rightButton {
  background-color: #e50914;
  color: white;
  border-color: black;
  border-width: 0.7px;
}
.emailControl {
  display: flex;
  height: 70px;
}
.emailControl input {
  flex: 3;
  font-size: 1.1rem;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.emailControl button {
  all: unset;
  flex: 1;
  font-size: 1.5rem;
  color: white;
  background-color: #e50914;
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
@media only screen and (max-width: 800px) {
  .navDiv {
    grid-template-columns: auto auto;
  }
  .rightNav {
    grid-column: 2 / span 1;
  }
}
</style>
