<template>
  <div class="accountDiv">
    <div class="nav">
      <NetflixLogo @click="moveHome"> </NetflixLogo>
    </div>
    <div class="content">
      <div class="header">
        <h1>Account</h1>
        <p class="member">Member Since 2022</p>
        <p v-if="alert" class="alert">{{ alert }}</p>
        <p v-if="message" class="message">{{ message }}</p>
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
            <!-- <p>Phone: 123456789</p> -->
          </div>
          <div class="actions">
            <p class="clickable" @click="toEmail">Change email</p>
            <p class="clickable" @click="toName">Change account name</p>
            <p class="clickable" @click="toPassword">Change password</p>
            <!-- <p>Change phone number</p> -->
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
          <div class="profiles">
            <p>
              <img
                class="profile"
                :src="returnImageUrl('one')"
                alt="user image"
              />
              {{ profiles.one || "..." }}
            </p>
            <p>
              <img
                class="profile"
                :src="returnImageUrl('two')"
                alt="user image"
              />
              {{ profiles.two || "..." }}
            </p>
            <p>
              <img
                class="profile"
                :src="returnImageUrl('three')"
                alt="user image"
              />
              {{ profiles.three || "..." }}
            </p>
            <p>
              <img
                class="profile"
                :src="returnImageUrl('four')"
                alt="user image"
              />
              {{ profiles.four || "..." }}
            </p>
            <p>
              <img
                class="profile"
                :src="returnImageUrl('five')"
                alt="user image"
              />
              {{ profiles.five || "..." }}
            </p>
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
            <p>Download your personal information</p>
            <p class="clickable" @click="logout">Sign out of all devices</p>
            <p class="clickable" @click="deleteAccount">
              <strong> Delete </strong>&nbsp;your account
            </p>
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
import { getProfileImage } from "../store/data";
export default {
  components: {
    NetflixLogo,
    TheFooter,
  },
  data() {
    return {
      email: "",
      name: "",
      alert: null,
      message: null,
      profileImages: {},
      profiles: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
      },
    };
  },
  methods: {
    returnImageUrl(identifier) {
      let imagesId = this.profileImages;
      let id = imagesId[identifier];
      if (imagesId && identifier && id) {
        return getProfileImage(+id).imageUrl;
      } else {
        return getProfileImage(1).imageUrl;
      }
    },
    logout() {
      if (this.name === "visitor") {
        this.$store.dispatch("logOutVisitor");
        return this.$router.replace("/login");
      }
      this.$store.dispatch("logOut");
      this.$router.replace("/login");
    },
    moveHome() {
      this.$router.replace("/browse");
    },
    toEmail() {
      if (this.name === "visitor") {
        return (this.message = "Sorry, you cannot change the visitor email.");
      }
      this.$router.push("/email");
    },
    toName() {
      if (this.name === "visitor") {
        return (this.message = "Sorry, you cannot change the vistor name.");
      }
      this.$router.push("/name");
    },
    toPassword() {
      if (this.name === "visitor") {
        return (this.message = "Sorry, you cannot change the password as visitor.");
      }
      this.$router.push("/password");
    },
    deleteAccount() {
      if (this.name === "visitor") {
        this.message = "Sorry, you cannot delete the visitor account.";
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      this.$store
        .dispatch("deleteTheAccount")
        .then(() => {
          this.message =
            "Success account has been deleted. Thank you! See you soon.";
          window.scrollTo({ top: 0, behavior: "smooth" });
          setTimeout(() => {
            this.$router.replace("/login");
          }, 4500);
        })
        .catch((err) => {
          let errCode = "auth/requires-recent-login";
          if (errCode === err) {
            this.$store.dispatch("redirectUserToAccount", "account");
            this.alert =
              "Auth: requires recent login to delete. Redirecting you to sign in again...";
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              this.$store.dispatch("logOut");
              this.$router.push({
                path: "/login",
                query: { redirect: "account" },
              });
            }, 4500);
          } else {
            this.alert = err;
          }
        });
    },
  },
  beforeMount() {
    this.email = this.$store.getters.returnEmail;
    this.name = this.$store.getters.getName;
    this.profileImages = this.$store.getters.getProfileImages;
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.profiles = profiles;
    }
    if (this.$store.getters.getRedirectAuth) {
      this.message = "Successfully re-authenticated";
      this.$store.dispatch("redirectUserToAccount");
    }
  },
  updated() {
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.profiles = profiles;
    }
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
.profiles p {
  padding: 10px 0px;
  border-top: 1px solid grey;
  text-align: left;
  min-height: 45px;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  text-indent: 10px;
}
.actions p {
  padding: 10px 0px;
  border-top: 1px solid grey;
  text-align: left;
  min-height: 45px;
  width: 100%;
  margin: 0;
  display: flex;
  align-items: center;
}
.inner {
  width: 90%;
}
.message {
  color: green;
  font-size: 1.1rem;
  font-weight: bold;
}
.alert {
  color: red;
  font-size: 1.1rem;
  font-weight: bold;
}
.clickable:hover {
  cursor: pointer;
  text-decoration: underline;
}
.profile {
  width: 60px;
  height: auto;
  border-radius: 5px;
}
@media only screen and (max-width: 700px) {
  .inner {
    width: 90%;
  }
}
</style>
