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
      <div class="contentDiv">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h3>Watch anywhere. Cancel anytime.</h3>
        <h5>
          Ready to watch? Enter your email to create or restart your membership.
        </h5>
        <div class="emailControl">
          <input
            v-on:keyup.enter="submitEmail"
            type="text"
            placeholder="Email Address"
            v-model="email"
          />
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
      const savedEmail = this.email;
      //reset email
      this.email = "";
      alert(savedEmail);
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
  overflow-y: hidden;
  width: 100%;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.601);
}
/* replace with a inset color overlay */
.gradientDiv {
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.556);
}
.contentDiv {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
  font-size: 1.5rem;
  z-index: 3;
  max-width: 630px;
}
.contentDiv h1,
.contentDiv h3 {
  margin: 0;
  padding: 0;
}
.contentDiv h5 {
  margin: 0;
  margin-top: 25px;
  margin-bottom: 25px;
  font-size: 1.1rem;
  width: 100%;
}
.navDiv {
  width: 100%;
  height: 13vh;
  top: 0;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 20% auto 25%;
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
  display: flex;
  justify-content: center;
  align-items: center;
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
  position: relative;
  display: flex;
  height: 70px;
}
.emailControl input {
  flex: 2;
  font-size: 1.1rem;
}
.emailControl button {
  all: unset;
  flex: 1;
  font-size: 1.5rem;
  padding: 0;
  color: white;
  background-color: #e50914;
}
@media only screen and (max-width: 850px) {
  .navDiv {
    grid-template-columns: 30% auto 40%;
  }
  .contentDiv {
    font-size: 1.2rem;
  }
  .emailControl {
    font-size: 1.1rem;
  }
}
@media only screen and (max-width: 550px) {
  .contentDiv {
    font-size: 1rem;
    max-width: 470px;
  }
  .navDiv {
    grid-template-columns: auto auto;
  }
  .navDiv img {
    width: 100px;
  }
  .rightNav {
    grid-column: 2 / span 1;
  }
  .rightNav button {
    width: 80px;
    height: 30px;
  }
  .emailControl {
    font-size: 0.9rem;
    height: 50px;
  }
}
@media only screen and (max-height: 500px) {
  .contentDiv {
    font-size: 1rem;
  }
  .navDiv img {
    width: 100px;
    height: auto;
  }
  .emailControl {
    font-size: 1rem;
    height: 40px;
  }
}
@media only screen and (max-height: 350px) {
  .contentDiv {
    font-size: 0.75rem;
  }
  .emailControl {
    font-size: 0.75rem;
    height: 30px;
  }
}
</style>
