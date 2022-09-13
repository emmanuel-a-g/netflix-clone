<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li class="profile">{{ profiles.one || "+ profile" }}</li>
      <li class="profile">{{ profiles.two || "+ profile" }}</li>
      <li class="profile">{{ profiles.three || "+ profile" }}</li>
      <li class="profile">{{ profiles.four || "+ profile" }}</li>
      <li class="profile">{{ profiles.five || "+ profile" }}</li>
      <li class="action" @click="handleSelectuser">
        <img :src="pencil" alt="edit logo" />Manage profiles
      </li>
      <li class="action" @click="handleAccount">
        <img :src="user" alt="user logo" />Account
      </li>
      <li class="action"><img :src="help" alt="help logo" />Help Center</li>
      <li class="signout" @click="handleLogout">Sign out of Netflix</li>
    </ul>
  </div>
</template>

<script>
import user from "../../assets/user.png";
import help from "../../assets/help.png";
import pencil from "../../assets/pencil.png";
export default {
  data() {
    return {
      profiles: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
      },
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
  },
  beforeUpdate() {
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.profiles = profiles;
    }
  },
};
</script>

<style scoped>
.profile {
  width: 82%;
  text-align: left;
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
  width: 16px;
  height: 16px;
  margin: 0px 10px 0px 0px;
}
.signout {
  width: 100%;
  border-top: 1px solid rgb(148, 148, 148);
}
@media only screen and (max-width: 800px) {
  .visibleClass {
    right: 2vw;
  }
}
</style>
