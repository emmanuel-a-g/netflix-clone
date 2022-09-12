<template>
  <div class="loginDiv">
    <div class="innerDiv">
      <form @submit.prevent="submitLogin">
        <h2>Sign In</h2>
        <p v-if="error" class="error">{{ error }}</p>
        <input
          type="email"
          placeholder="Email"
          v-model.trim="email"
          v-on:keydown="validateEmail"
          v-on:blur="reset('email')"
          :class="{ highlight: alertEmail ? true : false }"
        />
        <span class="alert" v-if="alertEmail">
          Please enter a valid email.
        </span>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          v-on:keydown="validatePassword"
          v-on:blur="reset('password')"
          :class="{ highlight: alertPassword ? true : false }"
        />
        <span class="alert" v-if="alertPassword">
          Your password must contain between 6 and 60 characters.
        </span>
        <button>Sign In</button>
        <div class="help">
          <p>
            <input type="checkbox" v-model="rememberMe" />
            Remember me
          </p>
          <p>Need Help?</p>
        </div>
        <div class="info">
          <p>New to Netflix?&nbsp;</p>
          <p class="signup" @click="signUpForward">Sign up now.</p>
        </div>
        <div class="learn">
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot.
            <span :style="{ color: 'blue' }">Learn more.</span>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["error"],
  emits: ["submit-login"],
  data() {
    return {
      email: "",
      password: "",
      alertEmail: null,
      alertPassword: null,
      rememberMe: false,
      timer: null,
    };
  },
  methods: {
    reset(toReset) {
      if (toReset === "email" && this.alertEmail) {
        this.email = "";
        this.alertEmail = null;
      } else if (toReset === "password" && this.alertPassword) {
        this.password = "";
        this.alertPassword = null;
      }
    },
    validateEmail() {
      if (!this.email.includes("@")) {
        this.alertEmail = true;
      } else {
        this.alertEmail = false;
      }
    },
    validatePassword() {
      if (this.password.length < 6) {
        this.alertPassword = true;
      } else {
        this.alertPassword = false;
      }
    },
    submitLogin() {
      this.$emit("submit-login", {
        email: this.email,
        password: this.password,
        remember: this.rememberMe,
      });
    },
    signUpForward() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
.loginDiv {
  height: 85vh;
  width: 100%;
}
.innerDiv {
  height: 85vh;
  width: 450px;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  border-radius: 5px;
}
.innerDiv input {
  color: white;
}
.alert {
  font-size: 0.8rem;
  align-self: flex-start;
  margin: 0px;
  padding: 0px;
  color: orange;
}
.info {
  display: flex;
  align-items: center;
  height: 20px;
}
.learn {
  display: inline-flex;
}
.learn p {
  margin: 0;
  text-align: left;
}
.signup {
  color: white;
}
.signup:hover {
  text-decoration: underline;
}
.help {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
}
.help input {
  margin: 0;
  padding: 0;
  width: 18px;
  height: 18px;
  accent-color: rgb(215, 214, 214);
  border-radius: 5px;
  margin-right: 5px;
}
.help p {
  font-size: 0.8rem;
  color: lightgray;
  margin: 0;
  padding: 0;
  display: flex;
}
.help p:hover {
  cursor: pointer;
  text-decoration: underline;
}
form {
  min-height: 410px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 75%;
  display: flex;
  flex-direction: column;
}
h2 {
  align-self: flex-start;
}
button {
  background-color: var(--red);
  height: 45px;
  width: 101%;
  border: none;
  border-radius: 5px;
  color: white;
}
input {
  width: 100%;
  height: 45px;
  background-color: var(--grey);
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  text-indent: 5px;
}
p {
  font-size: 1rem;
  color: var(--greyish);
}
.error {
  font-size: 1rem;
  align-self: flex-start;
  margin: 0;
  padding: 0;
  color: rgb(214, 5, 5);
}
.highlight {
  border-bottom: 1px orange solid;
}
@media only screen and (max-width: 740px) {
  .innerDiv {
    width: 100% !important;
  }
  form {
    height: 510px;
  }
}
@media only screen and (max-height: 550px) {
  .innerDiv {
    background-color: transparent;
  }
  form {
    min-width: 400px !important;
  }
}
</style>
