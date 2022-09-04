<template>
  <div class="content">
    <img :src="image" alt="checkmark" />
    <div>
      <span class="step">STEP 3 OF 3</span>
      <h2>Choose how to pay</h2>
      <p>You're getting the Basic Plan for <strong>$9.99/month.</strong></p>
      <div class="text">
        <p><strong>Secure for peace of mind.</strong></p>
        <p><strong>Cancel easily online.</strong></p>
      </div>
    </div>
    <p class="lock">End-to-end encrypted &#128274;</p>
    <div id="options">
      <div>Credit or Debit Card</div>
      <div>PayPal</div>
      <div class="free" @click="freeSignUp">Free</div>
    </div>
  </div>
</template>

<script>
import image from "../../assets/lock.png";
export default {
  data() {
    return {
      image,
    };
  },
  methods: {
    freeSignUp() {
      this.$router.push("/signup/five");
    },
  },
};
</script>

<style scoped>
.free:hover {
  cursor: pointer;
}
.lock {
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
  text-align: right;
  width: 100%;
}
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
  width: 490px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1rem;
}
.content button {
  width: 100%;
  height: 55px;
  background-color: white;
  color: white;
  border: none;
  border-radius: 3px;
  font-size: 1.25rem;
}
.content img {
  width: 70px;
  height: auto;
}
h2 {
  font-size: 1.8rem;
  padding: 7px;
  margin: 0;
}
.text p {
  margin: 0;
  padding: 2px;
}
#options {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 30vh;
}
#options div {
  color: black;
  border: none;
  height: 50px;
  text-align: center;
  border-radius: 3px;
  border: 1.5px rgb(142, 140, 140) solid;
}
@media only screen and (max-width: 700px) {
  .content {
    width: 100%;
  }
  .content div {
    width: 99%;
  }
}
</style>
