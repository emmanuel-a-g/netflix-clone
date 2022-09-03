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
        <input
          type="email"
          required
          v-model="email"
          placeholder="Enter your email"
        />
        <input
          type="password"
          required
          v-model="password"
          placeholder="Add a password"
        />
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
      email: "",
      password: "",
      image,
      // emailAlert: null,
      // passwordAlert: null,
    };
  },
  methods: {
    handleSubmit() {
      if (this.email.includes("@") && this.password.length >= 6) {
        console.log(this.email, this.password);
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
