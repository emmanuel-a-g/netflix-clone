<template>
  <div class="content">
    <img :src="image" alt="devices logo" />
    <div>
      <span class="step">STEP 1 OF 3</span>
      <h2>Finish setting up your account</h2>
      <p>
        Netflix is personalized for you. Create a password to watch on any
        device at any time.
      </p>
      <button @click="nextTo">Next</button>
    </div>
  </div>
</template>

<script>
import image from "../../assets/devices.png";
export default {
  data() {
    return {
      image,
    };
  },
  methods: {
    nextTo() {
      this.$router.push("/signup/two");
    },
  },
};
</script>

<style scoped>
.step {
  font-size: 0.9rem;
}
.content {
  color: black;
  height: 87vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.content div {
  width: 350px;
  text-align: center;
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
  width: 200px;
  height: auto;
}
</style>
