<template>
  <div
    class="content"
    :style="{ 'background-color': atTop ? 'transparent' : 'black' }"
  >
    <div class="imgDiv" @mouseleave="hideBrowseBox">
      <div class="netflix">
        <img @click="handleHome" class="logo" :src="logo" alt="netflix logo" />
      </div>
      <p v-if="mobileView && show" @mouseenter="showBrowseBox">
        <span>Browse</span>
        <span id="down">&#9660;</span>
        <MobileBrowse
          @handleClose="hideBrowseBox"
          :show="showBrowse"
          @handleToList="handleMylist"
        ></MobileBrowse>
      </p>
    </div>
    <div class="middleMenu" v-if="!mobileView">
      <li
        @click="handleHome"
        :style="{ 'font-weight': currPath === 'browse' ? 'bold' : 'normal' }"
      >
        Home
      </li>
      <li
        @click="handleMylist"
        :style="{ 'font-weight': currPath === 'mylist' ? 'bold' : 'normal' }"
      >
        My List
      </li>
      <li>TV Shows</li>
      <li>Movies</li>
      <li>New & Popular</li>
      <li>Browse by Languages</li>
    </div>
    <div class="navBar">
      <ul @mouseleave="handleCloseToggles">
        <li @click="openInput" @mouseleave="closeInput">
          <div :class="{ openDiv: searchInput, closeDiv: !searchInput }">
            <img
              id="search"
              width="20px"
              height="20px"
              :src="lupa"
              alt="search icon"
            />
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
          <img
            id="bell"
            width="22px"
            height="22px"
            :src="bell"
            alt="bell icon"
          />
          <TheNotifications :show="showAlert"></TheNotifications>
        </li>
        <li class="profileItem" @mouseenter="toggleAccount">
          <span @click="toAccount">
            <img
              class="profileImage"
              :src="determineImage"
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
import MobileBrowse from "../../pages/browse/MobileBrowse.vue";
import { getProfileImage } from "../../store/data";
import { searchMovie } from "../../utils/index";
export default {
  props: ["show"],
  components: {
    TheBox,
    TheNotifications,
    MobileBrowse,
  },
  data() {
    return {
      name: "",
      identifier: "",
      currPath: "",
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
      showBrowse: false,
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
    determineImage() {
      const imagesId = this.$store.getters.getProfileImages;
      if (this.identifier) {
        let id = imagesId[this.identifier];
        return getProfileImage(+id).imageUrl;
      } else {
        return getProfileImage(21).imageUrl;
      }
    },
  },
  methods: {
    showBrowseBox() {
      this.showBrowse = true;
    },
    hideBrowseBox() {
      this.showBrowse = false;
    },
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
      this.showBrowse = false;
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
      const result = searchMovie(this.search);
      console.log("Result: ", result);
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
    handleMylist() {
      const currPath = this.$route.path.includes("mylist");
      if (!this.identifier) {
        this.$router.push({
          path: "/selectuser",
          query: {
            redirect: "mylist",
          },
        });
      } else if (this.identifier && !currPath) {
        this.$router.push({
          path: "/mylist",
          query: { identifier: this.identifier },
        });
      } else {
        //do nothing.
      }
    },
    handleHome() {
      if (this.$route.path.includes("browse")) {
        //donothing
      } else {
        this.$router.push("/browse");
      }
    },
    checkCurrentPath() {
      const currPath = this.$route.path;
      if (currPath.includes("browse")) {
        this.currPath = "browse";
      } else if (currPath.includes("mylist")) {
        this.currPath = "mylist";
      }
    },
  },
  beforeMount() {
    const currentProfile = this.$store.getters.getCurrentProfile;
    if (currentProfile.displayName) {
      this.name = currentProfile.displayName;
      this.identifier = currentProfile.name;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.setScroll);
    const breakpoint = 800;
    const small = 550;
    this.superSmall = window.innerWidth < small;
    this.mobileView = window.innerWidth < breakpoint;
    this.handleResize = () => this.setWidth();
    window.addEventListener("resize", this.handleResize);
    this.checkCurrentPath();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("scroll", this.setScroll);
  },
  updated() {
    this.checkCurrentPath();
  },
};
</script>

<style scoped>
.content {
  z-index: 7;
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
.imgDiv span {
  font-size: 0.75rem;
  color: white;
  font-weight: bold;
}
.netflix {
  height: 100%;
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
  z-index: 10;
}
#bell {
  width: 22px;
  height: 22px;
  z-index: 9;
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
