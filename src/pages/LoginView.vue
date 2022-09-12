<template>
  <div class="loginDiv">
    <div class="imageDiv">
      <img @click="goWelcome" :src="image" alt="netflix logo" />
      <div class="contentDiv">
        <LoginForm :error="error" @submit-login="handleLogin"></LoginForm>
      </div>
      <the-footer
        position="absolute"
        color="#0000008e"
        topBorder="#8c8c8c"
      ></the-footer>
    </div>
  </div>
</template>

<script>
import image from "../assets/netflix.png";
import LoginForm from "../components/ui/LoginForm.vue";
import TheFooter from "../components/ui/TheFooter.vue";
export default {
  components: {
    LoginForm,
    TheFooter,
  },
  data() {
    return {
      image,
      redirect: false,
      error: "",
    };
  },
  methods: {
    handleLogin({ email, password, remember }) {
      this.$store
        .dispatch("login", {
          email,
          password,
          remember,
        })
        .then(() => {
          console.log("Redirect after login :", this.redirect);
          if (this.redirect) {
            this.$router.replace(`/${this.redirect}`);
          } else {
            this.$router.replace("/browse");
          }
        })
        .catch((err) => {
          this.error = err.code;
          console.log("login failed: ", err.code);
        });
    },
    goWelcome() {
      this.$router.push("/");
    },
  },
  mounted() {
    const isRedirect = this.$store.getters.getRedirectAuth;
    console.log("redirect: ", isRedirect);
    if (isRedirect || isRedirect.length > 1) {
      this.redirect = isRedirect;
    }
  },
  beforeUpdate() {
    const isRedirect = this.$store.getters.getRedirectAuth;
    console.log("redirect: ", isRedirect);
  }
};
</script>

<style scoped>
.loginDiv {
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
.imageDiv img:hover {
  cursor: pointer;
}
.contentDiv {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 12vh;
  font-size: 1.5rem;
  z-index: 3;
  max-width: 630px;
  min-height: 650px;
}
p {
  color: black;
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
    min-height: 500px;
  }
}
@media only screen and (max-height: 550px) {
  .imageDiv {
    overflow-y: scroll;
  }
  .imageDiv img {
    width: 100px;
    height: auto;
    top: 5vh;
    left: 5vw;
    margin-top: 0;
  }
}
</style>
