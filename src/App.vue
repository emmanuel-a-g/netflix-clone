<template>
  <div class="app">
    <!-- logged in? show -->
    <!-- logged out? don't show -->
    <!-- I MIGHT NOT NEED THIS AFTER ALL -->
    <the-navigation v-if="showNav"></the-navigation>

    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "./layout/TheNavigation.vue";
import { mapGetters } from "vuex";
export default {
  components: { TheNavigation },
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  computed: {
    isUser() {
      return this.loggedIn;
    },
    showNav() {
      return this.loggedIn && this.show;
    },
    ...mapGetters(["loggedIn"]),
  },
};
</script>

<style>
/*Main app div*/
.app {
  min-height: 100vh;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  color: white;
  /* global variables */
  --red: #e50914;
  --grey: #333;
  --greyish: #8c8c8c;
}
/*Main settings for HTML-Vue-app div */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  background-color: white;
}
/*important*/
body {
  margin: 0;
  padding: 0;
}
/* remove any focus */
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
button:hover {
  cursor: pointer;
}
</style>
