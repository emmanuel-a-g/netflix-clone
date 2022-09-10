<template>
  <div class="accountDiv">
    <div class="nav">
      <NetflixLogo @click="moveHome"> </NetflixLogo>
    </div>
    <div class="content">
      <div class="header">
        <h1>Account</h1>
        <p class="member">Member Since 2022</p>
      </div>
      <form>
        <div class="inner">
          <p>MEMBERSHIP & BILLING</p>
          <div>
            <p>
              <strong>{{ email }}</strong>
            </p>
            <p v-if="name">{{ name }}</p>
            <p>Password: *********</p>
            <p>Phone: 123456789</p>
          </div>
          <div class="actions">
            <p @click="toEmail">Change email</p>
            <p @click="toName">Change account name</p>
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
  data() {
    return {
      email: "",
      name: "",
    };
  },
  methods: {
    moveHome() {
      this.$router.replace("/browse");
    },
    toEmail() {
      this.$router.push("/email");
    },
    toName() {
      this.$router.push("/name");
    },
  },
  mounted() {
    this.email = this.$store.getters.returnEmail;
    this.name = this.$store.getters.getName;
  },
};
</script>

<style scoped>
.header {
  align-self: center;
  min-width: 70vw;
  text-align: left;
}
.accountDiv {
  background-color: #f3f3f3;
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
  min-width: 70vw;
  display: flex;
  justify-content: center;
  background-color: white;
  margin-top: 10px;
  margin-bottom: 10px;
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
@media only screen and (max-width: 700px) {
  .inner {
    width: 90%;
  }
}
</style>
