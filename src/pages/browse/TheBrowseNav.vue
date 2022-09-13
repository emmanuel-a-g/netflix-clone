<template>
  <div
    class="content"
    :style="{ 'background-color': atTop ? 'transparent' : 'black' }"
  >
    <div class="imgDiv">
      <div class="netflix">
        <img class="logo" :src="logo" alt="netflix logo" />
      </div>
      <p v-if="mobileView">
        <span>Browse</span>
        <span id="down">&#9660;</span>
      </p>
    </div>
    <div class="middleMenu" v-if="!mobileView">
      <li>
        <strong> Home </strong>
      </li>
      <li>TV Shows</li>
      <li>Movies</li>
      <li>New & Popular</li>
      <li>My List</li>
      <li>Browse by Languages</li>
    </div>
    <div class="navBar">
      <ul @mouseleave="handleCloseToggles">
        <li @click="openInput" @mouseleave="closeInput">
          <div :class="{ openDiv: searchInput, closeDiv: !searchInput }">
            <img id="search" :src="lupa" alt="search icon" />
            <input
              ref="searchRef"
              type="text"
              placeholder="Titles, genres"
              maxlength="15"
              v-model="search"
              @keypress.enter="handleSearch"
              :class="{ invisible: !searchInput, visible: searchInput }"
            />
          </div>
        </li>
        <li>Kids</li>
        <li @mouseenter="toggleAlert">
          <img id="bell" :src="bell" alt="bell icon" />
          <TheNotifications :show="showAlert"></TheNotifications>
        </li>
        <li class="profileItem" @mouseenter="toggleAccount">
          <span @click="toAccount">
            <img
              class="profileImage"
              :src="determineProfile"
              alt="profile image"
            />
          </span>
          <span class="arrow">
            <img
              :src="arrow"
              :class="{ arrow: !showAccount, arrowUp: showAccount }"
              alt="arrow account"
          /></span>
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
import arrow from "../../assets/arrow.png";
import TheNotifications from "../../components/ui/TheNotifications.vue";
import { profileImages } from "../../store/data";
export default {
  components: {
    TheBox,
    TheNotifications,
  },
  data() {
    return {
      name: "",
      mobileView: false,
      openMenu: false,
      handleResize: null,
      scrollPosition: 0,
      searchInput: false,
      search: "",
      showAccount: false,
      showAlert: false,
      lupa,
      menu,
      logo,
      superSmall: false,
      bell,
      arrow,
    };
  },
  computed: {
    theName() {
      const name = this.$store.getters.getName;
      if (this.name !== "New" && this.name.length > 1) {
        return this.name;
      } else if (name !== null && name.length > 1) {
        return name;
      } else {
        return "visitor";
      }
    },
    atTop() {
      if (this.scrollPosition === 0) {
        return true;
      } else {
        return false;
      }
    },
    determineProfile() {
      const curr = this.$store.getters.getCurrentProfile;
      if (curr.name === "one") {
        return profileImages[0].imageUrl;
      } else if (curr.name === "two") {
        return profileImages[1].imageUrl;
      } else if (curr.name === "three") {
        return profileImages[2].imageUrl;
      } else if (curr.name === "four") {
        return profileImages[4].imageUrl;
      } else if (curr.name === "five") {
        return profileImages[5].imageUrl;
      } else {
        return profileImages[3].imageUrl;
      }
    },
  },
  methods: {
    toAccount() {
      this.$router.push("/account");
    },
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    setWidth() {
      const breakpoint = 800;
      const small = 550;
      this.mobileView = window.innerWidth < breakpoint;
      this.superSmall = window.innerWidth < small;
    },
    setScroll() {
      this.scrollPosition = window.top.scrollY;
    },
    openInput() {
      if (!this.searchInput) {
        this.searchInput = true;
        this.$refs.searchRef.focus();
        this.handleCloseToggles();
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
      } else {
        this.handleCloseToggles();
        this.showAccount = true;
      }
    },
    toggleAlert() {
      if (!this.showAccount) {
        this.showAlert = true;
      } else {
        this.handleCloseToggles();
        this.showAlert = true;
      }
    },
    handleCloseToggles() {
      this.showAccount = false;
      this.showAlert = false;
    },
  },
  mounted() {
    const currentProfile = this.$store.getters.getCurrentProfile;
    if (currentProfile.displayName) {
      this.name = currentProfile.displayName;
    }
    window.addEventListener("scroll", this.setScroll);
    const breakpoint = 800;
    const small = 550;
    this.superSmall = window.innerWidth < small;
    this.mobileView = window.innerWidth < breakpoint;
    this.handleResize = () => this.setWidth();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.setScroll);
  },
};
</script>

<style scoped>
.content {
  z-index: 2;
  position: fixed;
  min-height: 8vh;
  width: 100%;
  display: grid;
  grid-template-columns: 15% auto 35%;
  grid-template-rows: 1pt;
  transition: 500ms;
}
.middleMenu {
  grid-column: 2 / span 1;
  min-height: 8vh;
  display: flex;
  align-items: center;
  width: 80%;
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
  min-height: 8vh;
  padding-right: 3.5vw;
}
.navBar li {
  list-style: none;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0px 10px;
  /* New property learned */
  white-space: nowrap;
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
.profileItem {
  display: flex;
  align-items: center;
}
.profileImage {
  width: 32px;
  height: auto;
  border-radius: 4px;
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
  align-items: center;
}
.netflix {
  height: 100%;
}
.imgDiv span {
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
}
.logo {
  width: 130px;
  height: auto;
  margin-top: -14px;
}
.menu {
  width: 20px;
  height: 20px;
}
#down {
  font-size: 0.7rem;
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
  height: 5vh;
  transition: 300ms;
  background-color: transparent;
}
.openDiv {
  padding: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px;
  height: 5vh;
  transition: 200ms;
  background-color: black;
  border: 1px solid white;
}
.arrow {
  color: white;
  font-weight: bold;
  margin: 0;
  margin-left: 2px;
  padding: 0;
  transform: rotate(0deg);
  transition-duration: 200ms;
}
.arrowUp {
  color: white;
  font-weight: bold;
  margin: 0;
  margin-left: 2px;
  padding: 0;
  transform: rotate(180deg);
  transition-duration: 200ms;
}
.arrow img {
  width: 12px;
  height: 12px;
}
@media only screen and (max-width: 800px) {
  .content {
    display: flex;
    justify-content: space-between;
  }
  .logo {
    width: 100px;
    height: auto;
  }
  .imgDiv {
    margin-left: 15px;
  }
  .navBar {
    padding-right: 0px;
  }
}
@media only screen and (max-width: 550px) {
  .openDiv {
    width: 110px;
    height: 4.5vh;
  }
  #down {
    font-size: 0.55rem;
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
  .middleMenu li {
    font-size: 0.7rem;
  }
  .navBar {
    padding-right: 5px;
  }
  .logo {
    width: 80px;
    height: auto;
    margin-top: 3px;
  }
}
@media only screen and (max-width: 1150px) {
  .middleMenu {
    width: 100%;
  }
}
</style>
