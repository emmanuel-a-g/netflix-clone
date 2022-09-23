<template>
  <div class="welcomeDiv">
    <div class="welcomeImageDiv">
      <div class="navDiv">
        <div class="leftNav">
          <img :src="image" alt="netflix logo" />
        </div>
        <div class="rightNav">
          <button class="leftButton">English &#9660;</button>
          <button @click="forwardLogin" class="rightButton">Sign In</button>
        </div>
      </div>
      <div class="contentDiv">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <p id="watch">Watch anywhere. Cancel anytime.</p>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <email-form @submit-email="submitEmail"> </email-form>
      </div>
    </div>
    <div class="blackLine"></div>
    <banner-card
      myHeight="60"
      textSide="left"
      imageSide="right"
      imageName="tv"
      :data="data[0]"
    ></banner-card>
    <div class="blackLine"></div>
    <banner-card
      myHeight="60"
      textSide="right"
      imageSide="left"
      imageName="phone"
      :data="data[1]"
    ></banner-card>
    <div class="blackLine"></div>
    <banner-card
      myHeight="70"
      textSide="left"
      imageSide="right"
      imageName="tv"
      :data="data[2]"
    ></banner-card>
    <div class="blackLine"></div>
    <banner-card
      myHeight="70"
      textSide="right"
      imageSide="left"
      imageName="phone"
      :data="data[3]"
    ></banner-card>
    <div class="blackLine"></div>
    <questions-comp
      title="Frequently Asked Questions"
      :data="questions"
      @submit-email="submitEmail"
    ></questions-comp>
    <div class="blackLine"></div>
    <the-footer position="relative"></the-footer>
  </div>
</template>

<script>
import BannerCard from "../components/BannerCard.vue";
import QuestionsComp from "../components/QuestionsComp.vue";
import EmailForm from "../components/ui/EmailForm.vue";
import TheFooter from "../components/ui/TheFooter.vue";
import { welcome, questions } from "../store/static";
import image from "../assets/netflix.png";
export default {
  components: {
    BannerCard,
    QuestionsComp,
    EmailForm,
    TheFooter,
  },
  data() {
    return {
      data: welcome,
      questions,
      image,
    };
  },
  methods: {
    submitEmail(email) {
      //If email already user? forward to login.
      this.$store.dispatch("actionEmail", email);
      this.$router.push("/signup");
    },
    forwardLogin() {
      this.$router.push("/login");
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
  z-index: 12;
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
  z-index: 13;
  max-width: 630px;
}
#watch {
  font-size: 1.7rem;
}
.contentDiv p {
  margin: 15px;
  padding: 0;
  font-size: 1.1rem;
  text-align: center;
}
.contentDiv h1 {
  margin: 0;
  margin-top: 25px;
  margin-bottom: 10px;
}
.navDiv {
  width: 100%;
  height: 13vh;
  top: 0;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 18% auto 25%;
  grid-template-rows: 1pt;
  z-index: 13;
}
.navDiv img {
  width: 140px;
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
  border-radius: 2px;
  font-size: 0.9rem;
}
.leftButton {
  background-color: rgba(0, 0, 0, 0.738);
  color: white;
  border-color: #ffffff;
  border-width: 0.7px;
  white-space: nowrap;
}
.rightButton {
  background-color: var(--red);
  color: white;
  border-color: black;
  border-width: 0.7px;
}
.blackLine {
  height: 1vh;
  width: 100%;
  background-color: #222;
}
@media only screen and (max-width: 850px) {
  .navDiv {
    grid-template-columns: 30% auto 40%;
  }
  .contentDiv {
    font-size: 1.2rem;
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
}
@media only screen and (max-height: 500px) {
  .contentDiv {
    font-size: 1rem;
  }
  .navDiv img {
    width: 100px;
    height: auto;
  }
}
@media only screen and (max-height: 350px) {
  .contentDiv {
    font-size: 0.75rem;
  }
}
</style>
