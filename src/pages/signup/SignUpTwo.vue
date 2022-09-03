<template>
  <div class="content">
    <div>
      <span class="step">STEP 1 OF 3</span>
      <h2>Create a password to start your membership</h2>
      <p>
        Just a few more steps and you're done! <br />
        We hate paperwork, too.
      </p>
      <form @submit.prevent="handleSubmit">
        <input v-if="forwardEmail" type="email" :value="email" readonly />
        <input
          v-else
          type="email"
          v-model="email"
          placeholder="Place your email"
        />
        <span v-if="emailAlert"></span>
        <input
          type="password"
          required
          v-model="password"
          placeholder="Add a password"
        />
        <span v-if="passwordAlert"></span>
        <button>Next</button>
      </form>
    </div>
  </div>
</template>

<script>
import image from "../../assets/logo.png";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      emailAlert: null,
      passwordAlert: null,
      image,
      forwardEmail: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.email.includes("@") && this.password.length >= 6) {
        this.$store.dispatch("setDetails", {
          email: this.email,
          password: this.password,
        });
        this.nextTo();
      }
      setTimeout(() => {
        this.email = "";
        this.password = "";
      }, 500);
    },
    nextTo() {
      this.$router.push("/signup/three");
    },
    setSavedEmail() {
      this.email = this.getEmail;
    },
  },
  computed: {
    ...mapGetters(["getEmail"]),
  },
  mounted() {
    if (this.getEmail) {
      this.email = this.getEmail;
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
input {
  width: 98%;
  height: 45px;
  background-color: transparent;
  border-radius: 3px;
  font-size: 1rem;
  color: black;
  border: 1px solid black;
}
h2 {
  font-size: 1.8rem;
}
</style>
