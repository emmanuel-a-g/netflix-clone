<template>
  <div class="content">
    <img :src="image" alt="checkmark" />
    <div>
      <span class="step">STEP 2 OF 3</span>
      <h2>Choose your plan.</h2>
      <div class="checks">
        <p>No commitments, cancel anytime.</p>
        <p>Everything on Netflix for one low price.</p>
        <p>Unlimited viewing on all your devices.</p>
      </div>
    </div>
    <button @click="nextTo">Next</button>
  </div>
</template>

<script>
import image from "../../assets/checkmark.png";
export default {
  data() {
    return {
      image,
    };
  },
  methods: {
    nextTo() {
      this.$router.push("/signup/four");
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
.checks {
  display: flex;
  align-items: center;
}
.checks p {
  font-size: 1rem;
  width: 80%;
  text-align: left;
}
.content div {
  width: 340px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
