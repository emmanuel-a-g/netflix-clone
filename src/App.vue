<template>
  <div class="app">
    <!-- logged in? show -->
    <!-- logged out? don't show -->
    <the-navigation v-if="isUser"></the-navigation>

    <router-view></router-view>
  </div>
</template>

<script>
import TheNavigation from "./layout/TheNavigation.vue";
import { mapGetters } from "vuex";
export default {
  components: { TheNavigation },
  name: "App",
  computed: {
    isUser() {
      return this.user;
    },
    ...mapGetters(["user"]),
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
</style>
