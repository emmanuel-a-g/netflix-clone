<template>
  <div class="emailControl">
    <input
      v-on:keyup.enter="submitEmail"
      type="email"
      placeholder="Email Address"
      v-model="email"
    />
    <button @click="submitEmail">Get Started</button>
  </div>
</template>

<script>
export default {
  emits: ["submit-email"],
  data() {
    return {
      email: "",
    };
  },
  methods: {
    submitEmail() {
      if (!this.email.includes("@")) {
        alert("Not a valid email!");
        return;
      }
      const email = this.email;
      this.$emit("submit-email", email);
      setTimeout(() => {
        this.email = "";
      }, 500);
    },
  },
};
</script>

<style scoped>
.emailControl {
  position: relative;
  display: flex;
  height: 70px;
  margin-bottom: 15px;
}
.emailControl input {
  flex: 2;
  font-size: 1.1rem;
}
.emailControl button {
  all: unset;
  flex: 1;
  font-size: 1.5rem;
  padding: 0;
  color: white;
  background-color: #e50914;
  text-align: center;
}
.emailControl button:hover {
  cursor: pointer;
}
@media only screen and (max-width: 550px) {
  .emailControl {
    height: 50px;
  }
  .emailControl button {
    font-size: 0.9rem;
  }
}
@media only screen and (max-height: 500px) {
  .emailControl {
    font-size: 1rem;
    height: 40px;
  }
}
@media only screen and (max-height: 350px) {
  .emailControl {
    font-size: 0.75rem;
    height: 30px;
  }
}
</style>
