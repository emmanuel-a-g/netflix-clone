<template>
  <div class="content">
    <div class="imgDiv">
      <aside
        @click="toggleMenu"
        :class="{ activeSide: openMenu, side: !openMenu }"
      ></aside>
      <p v-if="mobileView">
        <img class="menu" :src="menu" alt="menu" @click="toggleMenu" />
      </p>
      <div>
        <img class="logo" :src="logo" alt="netflix logo" />
      </div>
    </div>
    <div class="searchBar" v-if="mobileView">
      <input type="text" placeholder="search" />
    </div>
    <div class="navBar" v-if="!mobileView">
      <ul>
        <li @click="switchUser">Switch Profiles</li>
        <li @click="account">Account</li>
        <li>{{ name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/netflix.png";
import menu from "../../assets/menu.png";
export default {
  data() {
    return {
      logo,
      menu,
      mobileView: false,
      openMenu: false,
      handleResize: null,
    };
  },
  computed: {
    name() {
      const name = this.$store.getters.getName;
      if (name) {
        return name;
      } else {
        return "Visitor";
      }
    },
  },
  methods: {
    account() {
      this.$router.push("/account");
    },
    switchUser() {
      this.$router.push("/selectuser");
    },
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    setWidth() {
      const breakpoint = 650;
      this.mobileView = window.innerWidth < breakpoint;
    },
  },
  mounted() {
    const breakpoint = 650;
    const mobileView = window.innerWidth < breakpoint;
    this.mobileView = mobileView;
    this.handleResize = () => this.setWidth();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.side {
  width: 70%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 200%;
  transition: 300ms;
  background-color: transparent;
  z-index: 199;
}
.activeSide {
  width: 30%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 70%;
  background-color: aqua;
  transition: 200ms;
  z-index: 200;
}
.content {
  min-height: 8vh;
  display: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: 30% auto 30%;
  grid-template-rows: 1pt;
  background-color: aquamarine;
}
.navBar {
  grid-column: 3 / span 1;
  min-height: 8vh;
}
.navBar li {
  list-style: none;
  text-align: center;
  cursor: pointer;
}
.navBar ul {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
}
.imgDiv {
  grid-column: 1 / span 1;
  display: flex;
  justify-content: space-evenly;
  background-color: blue;
}
.imgDiv div {
  height: 100%;
}
.logo {
  width: 140px;
  height: auto;
  margin-top: -2vh;
}
.menu {
  width: 20px;
  height: 20px;
}
.searchBar {
  min-height: 8vh;
  background-color: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchBar input {
  height: 23px;
  border: 1px solid grey;
  margin-right: 10px;
}
@media only screen and (max-width: 650px) {
  .content {
    display: flex;
    max-height: 8vh;
    justify-content: space-between;
  }
  .logo {
    width: 100px;
    height: auto;
    margin-top: -5px;
  }
  .imgDiv {
    margin-left: 8px;
  }
}
@media only screen and (max-width: 950px) {
  .content {
    grid-template-columns: 20% auto;
  }
}
</style>
