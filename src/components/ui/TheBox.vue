<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li class="profile">verito</li>
      <li class="profile">sultan</li>
      <li class="profile">ninos</li>
      <li class="profile">wendy</li>
      <li class="action" @click="handleSelectuser">manage profiles</li>
      <li class="action" @click="handleAccount">account</li>
      <li class="action">help center</li>
      <li class="signout" @click="handleLogout">Sign out of Netflix</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["show", "width", "height", "top", "right"],
  methods: {
    handleHover() {
      console.log("I was hovered");
    },
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
  // computed: {},
};
</script>

<style scoped>
.profile {
  text-align: left;
  text-indent: 20px;
}
.signout {
  border-top: 1px solid white;
}
.action {
  text-indent: 20px;
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
  height: 100%;
  width: 100%;
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
  top: 10.5vh;
  right: 4vw;
  visibility: visible;
  /* transition: 200ms; */
  z-index: 1;
}
.hiddenClass {
  position: absolute;
  height: 340px;
  width: 220px;
  top: 10.5vh;
  right: 4vw;
  background-color: transparent;
  visibility: hidden;
}
@media only screen and (max-width: 800px) {
  .visibleClass {
    right: 2vw;
  }
}
</style>
