<template>
  <div
    class="top"
    :style="{
      'background-color': color ? color : 'white',
      'border-color': borderColor ? borderColor : '#e4e1e1',
    }"
  >
    <nav>
      <img @click="goHome" :src="image" alt="netflix logo" />
      <h2 :style="{ color: textColor ? textColor : 'black' }" @click="logInOut">
        {{ theTitle }}
      </h2>
    </nav>
  </div>
</template>

<script>
// LOGGED IN OR LOGGED OUT DEPENDENT!!
import { mapGetters } from "vuex";
import image from "../../assets/netflix.png";
export default {
  props: ["title", "color", "textColor", "borderColor"],
  data() {
    return {
      image,
    };
  },
  methods: {
    goHome() {
      this.$router.replace("/");
    },
    logInOut() {
      if (!this.loggedIn) {
        this.$router.replace("/login");
      } else {
        this.$store.dispatch("logOut");
        //1. log out 1. go back to home
        this.$router.replace("/");
      }
    },
  },
  computed: {
    theTitle() {
      if (this.loggedIn) {
        return "Log Out";
      } else {
        return "Sign In";
      }
    },
    ...mapGetters(["loggedIn"]),
  },
};
</script>

<style scoped>
.top {
  height: 13vh;
  /* color determine on top */
  border-bottom: 1px solid;
}
.top img {
  width: 170px;
  height: auto;
  margin-left: 38px;
}
.top h2 {
  padding: 0;
  margin: 0;
  color: black;
  padding-right: 30px;
}
.top nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
</style>
