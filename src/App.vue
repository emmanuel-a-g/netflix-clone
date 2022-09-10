<template>
  <div class="app">
    <router-view> </router-view>
  </div>
</template>

<script>
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",
  data() {
    return {
      user: "",
    };
  },
  beforeCreate() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = user.uid;
        this.$store.dispatch("authenticate", { user: user });
      } else {
        console.log("app: no-user");
      }
    });
  },
  // mounted() {},
  // beforeUpdate() {},
  // updated() {},
  // beforeUnmount(){},
  // unmounted() {}
};
</script>

<style>
/*Main app div*/
.app {
  /* NEW */
  /* min-width: 300px; */
  /* NEW */
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
  background-color: black;
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
.noSelect {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.noSelect:focus {
  outline: none !important;
}
:focus {
  outline: none !important;
}
button:hover {
  cursor: pointer;
}
</style>
