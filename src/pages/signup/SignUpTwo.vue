<template>
  <div class="content">
    <div>
      <span class="step">STEP 1 OF 3</span>
      <h2>Create a password to start your membership</h2>
      <p>
        Just a few more steps and you're done! <br />
        We hate paperwork, too.
      </p>
      <form class="theForm" @submit.prevent="handleSubmit">
        <p v-if="error" class="error">{{ error }}</p>
        <input
          class="two"
          v-if="forwardEmail"
          type="email"
          :value="email"
          readonly
        />
        <input
          class="two"
          v-else
          type="email"
          v-model.trim="email"
          placeholder="Place your email"
        />
        <span v-if="emailAlert"></span>
        <input
          class="two"
          type="password"
          required
          :value="password"
          @keyup="setPassword"
          placeholder="Add a password"
          minlength="6"
          :class="{ inputAlert: passwordAlert }"
        />
        <span class="alert" v-if="passwordAlert">{{ passwordAlert }}</span>
        <button>Next</button>
      </form>
    </div>
  </div>
</template>

<script>
import image from "../../assets/logo.png";
export default {
  data() {
    return {
      error: "",
      email: "",
      password: "",
      emailAlert: null,
      passwordAlert: "",
      image,
      forwardEmail: false,
    };
  },
  methods: {
    setPassword(e) {
      this.password = e.target.value;
      this.validatePassword(e.target.value);
    },
    validatePassword(password) {
      if (password.length < 6) {
        this.passwordAlert = "Password must be at least 6 characters long";
      } else {
        this.passwordAlert = "";
      }
    },
    async handleSubmit() {
      if (this.email.includes("@") && this.password.length >= 6) {
        this.$store
          .dispatch("signUp", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.nextTo();
          })
          .catch((err) => {
            console.log("error sign up :", err);
            if (err === "auth/email-already-in-use") {
              this.error = "Email already in use. Login instead.";
            } else {
              this.error = err;
            }
          });
      }
      setTimeout(() => {
        this.email = "";
        this.password = "";
      }, 500);
    },
    nextTo() {
      this.$router.push("/signup/three");
    },
  },
  mounted() {
    const email = this.$store.getters.returnEmail;
    if (email) {
      this.email = email;
      this.forwardEmail = true;
    }
  },
};
</script>

<style scoped>
.content {
  color: black;
  height: 77vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.step {
  font-size: 0.9rem;
}
.content div {
  width: 400px;
  text-align: left;
  font-size: 1.1rem;
}
.content button {
  width: 100%;
  height: 55px;
  background-color: var(--red);
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 1.25rem;
}
.content img {
  width: 100px;
  height: auto;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
  height: 250px;
}
.two {
  width: 98%;
  height: 45px;
  background-color: transparent;
  border-radius: 3px;
  font-size: 1rem;
  color: black;
  border: 1px solid black;
  text-indent: 5px;
}
h2 {
  font-size: 1.8rem;
}
.alert {
  font-size: 0.9rem;
  align-self: flex-start;
  margin: 0px;
  padding: 0px;
  color: orange;
}
.inputAlert {
  border-bottom: 1px orange solid;
}
.error {
  color: red;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
