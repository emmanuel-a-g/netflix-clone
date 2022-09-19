<template>
  <div>
    <TheFakeNav
      color="black"
      textColor="red"
      borderColor="transparent"
    ></TheFakeNav>
    <div class="content">
      <form @submit.prevent="sendResetPassword">
        <div class="indent">
          <h3>Forgot Password</h3>
          <p
            class="message"
            :style="{ color: message ? 'green' : 'red' }"
            v-if="message || error"
          >
            {{ messageOrError }}
          </p>
          <p>What email address should we send the password reset email?</p>
          <input
            type="email"
            v-model="email"
            placeholder="name@example.com"
            required
            @keyup="emailValidation"
            @blur="resetAlert"
          />
          <p v-if="emailAlert" class="emailAlert">
            Please enter a valid email.
          </p>
          <p v-else class="nothing">.</p>
          <button :disabled="emailAlert">Email Me</button>
          <p>
            This page is protected by Google reCAPTCHA to ensure you're not a
            bot. <span> Learn more.</span>
          </p>
        </div>
      </form>
    </div>
    <TheFooter position="relative"></TheFooter>
  </div>
</template>

<script>
import TheFooter from "../components/ui/TheFooter.vue";
import TheFakeNav from "../components/ui/TheFakeNav.vue";

export default {
  components: {
    TheFooter,
    TheFakeNav,
  },
  data() {
    return {
      email: "",
      message: "",
      error: "",
      emailAlert: false,
    };
  },
  computed: {
    messageOrError() {
      if (this.message) {
        return this.message;
      } else if (this.error) {
        return this.error;
      } else {
        return "No current message.";
      }
    },
  },
  methods: {
    resetAlert() {
      this.emailAlert = false;
    },
    emailValidation() {
      if (!this.email.includes("@")) {
        this.emailAlert = true;
      } else {
        this.emailAlert = false;
      }
    },
    sendResetPassword() {
      this.$store
        .dispatch("resetPassword", this.email)
        .then((res) => {
          this.message = res;
        })
        .catch((err) => {
          this.error = err;
          this.email = "";
        });
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 85vh;
}
.content form {
  width: 430px;
  height: 430px;
  border: 1px solid white;
  background-color: rgb(250, 250, 250);
  color: black;
  font-size: 1rem;
}
.indent {
  margin: 25px 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 90%;
}
.indent h3 {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: normal;
}
input {
  width: 100%;
  height: 40px;
  color: black;
  text-indent: 10px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid grey;
  margin: 0;
  padding: 0;
}
button {
  width: 100%;
  border-radius: 3px;
  background-color: #0080ff;
  height: 45px;
  margin: 0;
  font-size: 18px;
  padding: 0;
  border: none;
  color: white;
}
.nothing {
  color: transparent;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
}
.emailAlert {
  color: var(--red);
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
}
.message {
  margin: 0;
  padding: 0;
  font-weight: 600;
}
span {
  text-decoration: underline;
}
</style>
