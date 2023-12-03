<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li
        v-for="(prof, idx) in profilesWithUsers"
        :key="idx"
        class="profile"
        @click="handleSelectuser"
      >
        <img
          v-if="profileImagesURL[prof]"
          class="profileImage"
          :src="profileImagesURL[prof]"
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
import { mapGetters } from "vuex";
export default {
  props: ["show"],
  data() {
    return {
      user,
      help,
      pencil,
    };
  },

  computed: {
    ...mapGetters({
      profiles: "getProfiles",
      profileImages: "getProfileImages",
    }),

    profileImagesURL() {
      const imagesId = this.profileImages;
      let obj = {};
      for (let key in imagesId) {
        obj[key] = getProfileImage(imagesId[key]).imageUrl;
      }

      return obj;
    },

    profilesWithUsers() {
      let filtered = [];
      const profiles = this.profiles;
      for (let key in profiles) {
        const name = profiles[key];
        if (name) {
          filtered.push(key);
        }
      }
      return filtered;
    },
  },

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
