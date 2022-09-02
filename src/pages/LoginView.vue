<template>
  <div class="loginDiv">
    <div class="imageDiv">
      <img :src="'./images/netflix.png'" alt="netflix logo" />
      <div class="contentDiv">
        <login-form></login-form>
      </div>
      <div class="loginFooter">
        <div>Questions? Call 1-123-456-789</div>
        <p><span>FAQ</span><span>Cookie Preferences</span></p>
        <p><span>Help Center</span><span>Corporate Information</span></p>
        <p><span>Terms of Use</span></p>
        <p><span>Privacy</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/ui/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
.loginDiv {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
}
.imageDiv {
  height: 140vh;
  background: url("~@/assets/netflix_home.jpeg") no-repeat left;
  background-size: cover;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  overflow-y: hidden;
  width: 100%;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.655);
}
.imageDiv img {
  width: 200px;
  height: auto;
  position: absolute;
  left: 1.2vw;
  top: 0;
  margin-top: -15px;
}
.contentDiv {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 12vh;
  font-size: 1.5rem;
  z-index: 3;
  max-width: 630px;
  min-height: 700px !important;
}
p {
  color: black;
}
.loginFooter {
  bottom: 0;
  position: absolute;
  z-index: 4;
  height: 30vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.555);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.loginFooter p {
  color: var(--greyish);
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 40%;
  text-align: left;
}
.loginFooter span:hover {
  text-decoration: underline;
}
.loginFooter div {
  position: absolute;
  left: 15%;
  top: 15%;
  color: var(--greyish);
}
@media only screen and (max-width: 740px) {
  .imageDiv {
    background-image: none;
    background-color: black;
    min-height: 120vh;
    display: inline-block;
  }
  .contentDiv {
    width: 100%;
    position: relative;
  }
  .loginFooter {
    position: relative;
    border-top: 1px var(--greyish) solid;
  }
  .loginFooter div {
    left: 8%;
  }
}
@media only screen and (max-height: 550px) {
  .imageDiv img {
    width: 100px;
    height: auto;
    top: 5vh;
    left: 5vw;
    margin: 0;
  }
  .loginFooter {
    min-height: 200px;
    position: relative;
    float: none;
  }
  .loginFooter p {
    height: 80%;
  }
}
</style>
