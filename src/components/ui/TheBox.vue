<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li
        v-for="(prof, idx) in live"
        :key="idx"
        class="profile"
        @click="handleSelectuser"
      >
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages[prof]"
          alt="img"
          width="26px"
          height="26px"
        />
        {{ profiles[prof] || "" }}
      </li>
      <li class="action" @click="handleSelectuser">
        <img width="18px" height="18px" :src="pencil" alt="edit logo" />Manage
        profiles
      </li>
      <li class="action" @click="handleAccount">
        <img width="18px" height="18px" :src="user" alt="user logo" />Account
      </li>
      <li class="action">
        <img width="18px" height="18px" :src="help" alt="help logo" />Help
        Center
      </li>
      <li class="signout" @click="handleLogout">Sign out of Netflix</li>
    </ul>
  </div>
</template>

<script>
import user from "../../assets/user.png";
import help from "../../assets/help.png";
import pencil from "../../assets/pencil.png";
import { getProfileImage } from "../../store/data";
export default {
  data() {
    return {
      profiles: {},
      profileImages: {},
      live: [],
      user,
      help,
      pencil,
    };
  },
  props: ["show"],
  methods: {
    handleAccount() {
      this.$router.push("/account");
    },
    handleLogout() {
      this.$store.dispatch("logOut");
      this.$router.replace("/login");
    },
    handleSelectuser() {
      this.$router.push("/selectuser");
    },
    makeProfileList(profiles) {
      let filtered = [];
      for (let key in profiles) {
        if (profiles[key]) {
          filtered.push([key]);
        }
      }
      this.live = filtered;
    },
  },
  mounted() {
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.profiles = profiles;
      this.makeProfileList(profiles);
    }
    this.$store
      .dispatch("profileNames")
      .then((res) => {
        const imagesId = res.images;
        const profiles = res.profiles;
        this.makeProfileList(profiles);
        this.profiles = profiles;
        let obj = {};
        for (let key in imagesId) {
          obj[key] = getProfileImage(imagesId[key]).imageUrl;
        }
        this.profileImages = obj;
      })
      .catch((err) => {
        console.log("Profile names error", err);
      });
  },
};
</script>

<style scoped>
.profile {
  width: 82%;
  text-align: left;
  display: flex;
}
.action {
  width: 82%;
  text-align: left;
}
.theBox ul {
  list-style: none;
  background-color: rgba(0, 0, 0, 0.82);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  border: 1px solid rgb(47, 47, 47);
}
.theBox li {
  list-style: none;
  margin: 0;
  padding: 5px 0px;
}
.theBox li:hover {
  text-decoration: underline;
}
.visibleClass {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.82);
  height: 340px;
  width: 220px;
  top: 8.5vh;
  right: 4vw;
  visibility: visible;
  /* transition: 200ms; */
  /* Z-INDEX PLACEMENT */
  z-index: 1;
}
.hiddenClass {
  position: absolute;
  height: 340px;
  width: 220px;
  top: 8.5vh;
  right: 4vw;
  background-color: transparent;
  visibility: hidden;
}
.action img {
  width: 18px;
  height: 18px;
  margin: 0px 10px 0px 0px;
}
.signout {
  width: 100%;
  border-top: 1px solid rgb(148, 148, 148);
}
.profileImage {
  width: 26px;
  height: 26px;
  margin-right: 8px;
  border-radius: 4px;
}
@media only screen and (max-width: 1000px) {
  .visibleClass {
    right: 2vw;
    top: 8.2vh;
  }
}
</style>
