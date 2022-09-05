<template>
  <div class="accountDiv">
    <div class="nav">
      <NetflixLogo @click="moveHome"> </NetflixLogo>
    </div>
    <div class="content">
      <h1>Account</h1>
      <p class="member">Member Since {{ date ? date : "2022" }}</p>
      <form>
        <div class="inner">
          <p>MEMBERSHIP & BILLING</p>
          <p>
            <strong>someEmail@gmail.com</strong>
          </p>
          <p>Password: *********</p>
          <p>Phone: 123456789</p>
          <div class="actions">
            <p>Change email</p>
            <p>Change password</p>
            <p>Change phone number</p>
          </div>
        </div>
      </form>
      <form>
        <div class="inner">
          <p>PLAN DETAILS</p>
          <p><strong> Premium </strong> ULTRA HD</p>
          <div class="actions">
            <p>Change plan</p>
          </div>
        </div>
      </form>
      <form>
        <div class="inner">
          <p>PROFILE & PARENTAL CONTROLS</p>
          <div class="actions">
            <p>Emmanuel</p>
            <p>Veronica</p>
            <p>Sultan</p>
            <p>Ninos</p>
            <p>Wendy</p>
          </div>
        </div>
      </form>
      <form>
        <div class="inner">
          <p>SETTINGS</p>
          <p><strong> Premium </strong> ULTRA HD</p>
          <div class="actions">
            <p>Parental controls</p>
            <p>Test participation</p>
            <p>Manage download services</p>
            <p>Sign out of all devices</p>
            <p>Download your personal information</p>
          </div>
        </div>
      </form>
    </div>
    <TheFooter position="relative" color="white"></TheFooter>
  </div>
</template>

<script>
import NetflixLogo from "../components/logo/NetflixLogo.vue";
import TheFooter from "../components/ui/TheFooter.vue";
export default {
  components: {
    NetflixLogo,
    TheFooter,
  },
  methods: {
    moveHome() {
      this.$router.replace("/browse");
    }
  }
};
</script>

<style scoped>
.accountDiv {
  background-color: rgb(208, 207, 207);
  min-height: 100vh;
}
.content {
  min-height: 100vh;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content form {
  border: 1px black solid;
  min-width: 500px;
  display: flex;
  justify-content: center;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content h1 {
  text-align: left;
  min-width: 500px;
  margin-bottom: 0px;
  font-size: 2.25rem;
}
.member {
  text-align: left;
  min-width: 500px;
  margin: 12px 0px;
}
.nav {
  height: 8vh;
  background-color: black;
  display: flex;
  justify-content: flex-end;
}
.actions {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.actions p {
  border-top: 1px solid grey;
  text-align: left;
  min-height: 45px;
  width: 100%;
  margin: 0;
  padding-top: 20px;
}
.inner {
  width: 90%;
}
</style>
