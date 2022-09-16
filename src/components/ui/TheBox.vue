<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li class="profile">
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages.one"
          alt="profile"
          width="26px"
          height="26px"
        />
        {{ profiles.one || "+ profile" }}
      </li>
      <li class="profile">
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages.two"
          alt="profile"
          width="26px"
          height="26px"
        />
        {{ profiles.two || "+ profile" }}
      </li>
      <li class="profile">
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages.three"
          alt="profile"
          width="26px"
          height="26px"
        />
        {{ profiles.three || "+ profile" }}
      </li>
      <li class="profile">
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages.four"
          alt="profile"
          width="26px"
          height="26px"
        />
        {{ profiles.four || "+ profile" }}
      </li>
      <li class="profile">
        <img
          v-if="profileImages"
          class="profileImage"
          :src="profileImages.five"
          alt="profile"
          width="26px"
          height="26px"
        />
        {{ profiles.five || "+ profile" }}
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
  },
  mounted() {
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.profiles = profiles;
    }
    this.$store
      .dispatch("profileNames")
      .then((res) => {
        const imagesId = res.images;
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
  background-color: rgba(0, 0, 0, 0.9);
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
  background-color: rgba(0, 0, 0, 0.95);
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
@media only screen and (max-width: 800px) {
  .visibleClass {
    right: 2vw;
  }
}
</style>
