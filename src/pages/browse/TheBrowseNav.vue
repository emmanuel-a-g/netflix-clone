<template>
  <div class="content">
    <div class="imgDiv">
      <aside
        @click="toggleMenu"
        :class="{ activeSide: openMenu, side: !openMenu }"
      ></aside>
      <div>
        <img class="logo" :src="logo" alt="netflix logo" />
      </div>
      <p v-if="mobileView">
        <span>Browse</span>
        <span id="down">&#9660;</span>
        <!-- <img class="menu" :src="menu" alt="menu" @click="toggleMenu" /> -->
      </p>
    </div>
    <div class="middleMenu" v-if="!mobileView">
      <li>Home</li>
      <li>TV Shows</li>
      <li>Movies</li>
      <li>New & Popular</li>
      <li>My List</li>
    </div>
    <div class="navBar">
      <ul>
        <li @click="openInput" @mouseleave="closeInput">
          <div :class="{ openDiv: searchInput, closeDiv: !searchInput }">
            <img id="search" :src="lupa" alt="search icon" />
            <input
              ref="searchRef"
              type="text"
              placeholder="Titles, genres"
              v-model="search"
              @keypress.enter="handleSearch"
              :class="{ invisible: !searchInput, visible: searchInput }"
            />
          </div>
        </li>
        <li>Kids</li>
        <li @mouseenter="toggleAlert" @mouseleave="handleCloseToggles">
          <img id="bell" :src="bell" alt="bell icon" />
          <TheNotifications :show="showAlert"></TheNotifications>
        </li>
        <li @mouseenter="toggleAccount" @mouseleave="handleCloseToggles">
          {{ name }}
          <TheBox :show="showAccount"></TheBox>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from "../../assets/netflix.png";
import menu from "../../assets/menu.png";
import lupa from "../../assets/lupa.png";
import bell from "../../assets/bellWhite.png";
import TheBox from "../../components/ui/TheBox.vue";
import TheNotifications from "../../components/ui/TheNotifications.vue";
export default {
  components: {
    TheBox,
    TheNotifications,
  },
  data() {
    return {
      mobileView: false,
      openMenu: false,
      handleResize: null,
      searchInput: false,
      search: "",
      showAccount: false,
      showAlert: false,
      lupa,
      menu,
      logo,
      superSmall: false,
      bell,
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
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    setWidth() {
      const breakpoint = 800;
      const small = 550;
      this.mobileView = window.innerWidth < breakpoint;
      this.superSmall = window.innerWidth < small;
    },
    openInput() {
      if (!this.searchInput) {
        this.searchInput = true;
        this.$refs.searchRef.focus();
      }
    },
    closeInput() {
      this.searchInput = false;
      this.search = "";
    },
    handleSearch() {
      console.log(this.search);
    },
    toggleAccount() {
      if (!this.showAlert) {
        this.showAccount = true;
      }
    },
    toggleAlert() {
      if (!this.showAccount) {
        this.showAlert = true;
      }
    },
    handleCloseToggles() {
      this.showAccount = false;
      this.showAlert = false;
    },
  },
  mounted() {
    const breakpoint = 800;
    const small = 550;
    this.superSmall = window.innerWidth < small;
    this.mobileView = window.innerWidth < breakpoint;
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
  /* background-color: aqua; */
  transition: 200ms;
  z-index: 200;
}
.content {
  min-height: 9vh;
  width: 100%;
  display: grid;
  grid-template-columns: 15% auto 35%;
  grid-template-rows: 1pt;
}
.middleMenu {
  grid-column: 2 / span 1;
  /* background-color: rosybrown; */
  min-height: 9vh;
  display: flex;
  align-items: center;
  width: 60%;
  height: 100%;
  justify-content: space-evenly;
}
.middleMenu li {
  list-style: none;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
}
.navBar {
  grid-column: 3 / span 1;
  min-height: 9vh;
  /* background-color: chartreuse; */
  padding-right: 3.5vw;
}
.navBar li {
  list-style: none;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 10px;
}
.navBar ul {
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
}
.navBar input::placeholder {
  color: grey;
}
.invisible {
  width: 0%;
  background-color: transparent;
  margin: 0 5px;
  border: none;
  height: 35px;
  color: white;
  font-size: 16px;
}
.visible {
  /* visibility: visible; */
  font-size: 16px;
  width: 100%;
  color: white;
  margin: 0 5px;
  border: none;
  height: 35px;
  background-color: transparent;
}
.imgDiv {
  grid-column: 1 / span 1;
  display: flex;
  justify-content: space-evenly;
  /* min-height: 9vh; */
}
.imgDiv div {
  height: 100%;
}
.imgDiv span {
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
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
#down {
  font-size: 0.75rem;
}
#search {
  width: 20px;
  height: 20px;
  z-index: 212;
}
#bell {
  width: 22px;
  height: 23px;
  z-index: 213;
  margin-top: 3px;
}
/* search input transition */
.closeDiv {
  padding: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0px;
  height: 6vh;
  transition: 300ms;
  background-color: transparent;
  z-index: 210;
}
.openDiv {
  padding: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 6vh;
  transition: 200ms;
  background-color: black;
  z-index: 211;
  border: 1px solid white;
}
@media only screen and (max-width: 800px) {
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
  .navBar {
    padding-right: 0px;
  }
}
@media only screen and (max-width: 550px) {
  .openDiv {
    width: 110px;
  }
  .openDiv {
    height: 4.5vh;
  }
}
@media only screen and (max-width: 950px) {
  .navBar li {
    font-size: 0.8rem;
  }
  .content {
    grid-template-columns: 20% auto 30%;
  }
  .middleMenu {
    width: 90%;
  }
  .navBar {
    padding-right: 5px;
  }
}
@media only screen and (max-width: 1150px) {
  .middleMenu {
    width: 100%;
  }
}
</style>
