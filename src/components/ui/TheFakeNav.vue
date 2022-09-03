<template>
  <div class="top" :style="{ 'background-color': color ? color : 'white' }">
    <nav>
      <!-- v-bind:src="require('images/rails.png')"  -->
      <img @click="goHome" :src="image" alt="netflix logo" />
      <h2 @click="logInOut">{{ theTitle }}</h2>
    </nav>
  </div>
</template>

<script>
// LOGGED IN OR LOGGED OUT DEPENDENT!!
import { mapGetters } from "vuex";
import image from "../../assets/netflix.png";
export default {
  props: ["title", "color"],
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
  border-bottom: 1px rgb(228, 225, 225) solid;
}
.top img {
  width: 210px;
  height: auto;
  margin-top: -3vh;
}
.top h2 {
  color: black;
  padding-right: 30px;
  padding-bottom: 20px;
}
.top nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
