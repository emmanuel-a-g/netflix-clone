<template>
  <div class="mainDiv">
    <TheFakeNav color="black" textColor="white"></TheFakeNav>
    <div class="passwordDiv">
      <form>
        <h1>Change Password</h1>
        <div class="inputDiv">
          <p v-if="message" class="message">{{ message }}</p>
          <p v-if="error" class="error">{{ error }}</p>
          <input
            class="currPassword"
            type="password"
            placeholder="New Password"
            :value="newPassword"
            @keyup="setNewPassword"
            minlength="6"
            required
          />
          <span class="alert" v-if="alertPasswordOne">
            {{ alertPasswordOne }}
          </span>
          <input
            class="newPassword"
            type="password"
            :value="confirmPassword"
            placeholder="Confirm Password"
            @keyup="setPasswordTwo"
            v-on:blur="reset"
            required
          />
          <span class="goodAlert" v-if="valid && !submitted">
            Valid password
          </span>
          <span class="alert" v-if="alertPassword">
            {{ alertPassword }}
          </span>
        </div>
        <div class="buttons">
          <button @click.prevent="save" v-if="!submitted">Confirm</button>
          <button @click.prevent="cancel" v-if="!submitted">Cancel</button>
          <button @click.prevent="goToAccount" v-if="message">Return</button>
        </div>
      </form>
    </div>
    <TheFooter
      topBorder="black"
      color="#f3f3f3"
      position="relative"
    ></TheFooter>
  </div>
</template>

<script>
import TheFakeNav from "../../components/ui/TheFakeNav.vue";
import TheFooter from "../../components/ui/TheFooter.vue";
export default {
  components: {
    TheFooter,
    TheFakeNav,
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      error: "",
      message: "",
      alertPasswordOne: "",
      alertPassword: "",
      submitted: false,
      valid: false,
    };
  },
  methods: {
    goToAccount() {
      this.$router.push("/account");
    },
    resetFields() {
      this.newPassword = "";
      this.confirmPassword = "";
    },
    reset() {
      if (this.alertPassword) {
        this.confirmPassword = "";
        this.alertPassword = "";
      }
    },
    validateNewPassword(password) {
      if (password.length < 6) {
        this.alertPasswordOne = "Password must be more than 6 characters long";
      } else {
        this.alertPasswordOne = false;
      }
    },
    validateConfirmPassword(password) {
      if (password.length < 6) {
        this.alertPassword = "Password must be more than 6 characters long";
        this.valid = false;
      } else if (this.newPassword !== password) {
        this.alertPassword = "Passwords do not match";
        this.valid = false;
      } else {
        this.alertPassword = false;
        this.valid = true;
      }
    },
    setNewPassword(e) {
      const password = e.currentTarget.value;
      this.validateNewPassword(password);
      this.newPassword = password;
    },
    setPasswordTwo(e) {
      const password = e.currentTarget.value;
      this.validateConfirmPassword(password);
      this.confirmPassword = password;
    },
    save() {
      this.submitted = true;
      if (!this.valid) {
        this.error = "Not a valid password update check for errors.";
        this.submitted = false;
        return;
      }
      this.$store
        .dispatch("updateThePassword", this.confirmPassword)
        .then(() => {
          this.message = "Success password has been changed.";
        })
        .catch((err) => {
          let requiresAuth = "auth/requires-recent-login";
          if (err === requiresAuth) {
            this.$store.dispatch("redirectUserToAccount", "password");
            this.error =
              "Auth / requires recent login. You will now be re-directed to log in again.";
            this.dispatchLogout();
          } else {
            this.submitted = false;
            this.error = err;
          }
        });
    },
    cancel() {
      this.$router.push("/account");
    },
    dispatchLogout() {
      setTimeout(() => {
        this.$store.dispatch("logOut");
        this.$router.push({ path: "/login", query: { redirect: "password" } });
      }, 5000);
    },
  },
  mounted() {
    this.submitted = false;
    if (this.$store.getters.getRedirectAuth) {
      this.message = "Successfully re-authenticated";
      this.$store.dispatch("redirectUserToAccount");
    }
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 30px;
  height: 35px;
}
.buttons button {
  border: none;
  border-radius: 3px;
  padding: 11px;
  width: 100px;
  font-weight: bold;
}
.buttons :nth-child(1) {
  background-color: #0f84fa;
  color: white;
  margin-right: 10px;
}
.buttons :nth-child(2) {
  color: black;
  background-color: #ccc;
}
.mainDiv {
  background-color: #f3f3f3;
}
.passwordDiv {
  padding-top: 30px;
  min-height: 65vh;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 240px;
}
.currPassword {
  font-size: 1rem;
  width: 400px;
  height: 44px;
  border: 1px solid grey;
  border-radius: 3px;
  text-indent: 5px;
  font-size: 1rem;
}
.newPassword {
  width: 400px;
  height: 44px;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #e8f0fe;
  text-indent: 5px;
  font-size: 1rem;
}
.inputDiv {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.inputDiv p {
  font-size: 1.1rem;
  padding: 0;
  margin: 0;
  font-weight: bold;
}
.message {
  color: rgb(0, 79, 0);
}
.error {
  color: red;
}
.alert {
  font-size: 0.9rem;
  align-self: flex-start;
  margin: 0px;
  padding: 0px;
  color: rgb(255, 0, 51);
  font-style: italic;
}
.goodAlert {
  font-size: 0.9rem;
  align-self: flex-start;
  margin: 0px;
  padding: 0px;
  color: black;
  font-style: italic;
}
</style>
