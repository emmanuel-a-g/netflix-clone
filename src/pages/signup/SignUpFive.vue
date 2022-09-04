<template>
  <div class="content">
    <div class="imageDiv">
      <span class="step">Welcome!</span>
      <h2>To thousands of on demand Shows and Movies!</h2>
      <p>and newly released</p>
      <h2>Netflix Originals!</h2>
    </div>
    <button @click="startStreaming">Start Streaming</button>
  </div>
</template>

<script>
export default {
  methods: {
    startStreaming() {
      //check for logged in?
      //take to USERS page...
      //creat Avatar
      //OR
      //Start Streaming...
      this.$router.push("/selectuser");
    },
  },
};
</script>

<style scoped>
.content {
  color: black;
  height: 87vh;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: url("~@/assets/netflix_home.jpeg") no-repeat center;
  background-size: cover;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.601);
}
.imageDiv {
  width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1.1rem;
  color: white;
  margin-bottom: 15px;
}
h2 {
  font-size: 1.8rem;
  padding: 7px;
  margin: 0;
}
.step {
  font-size: 1rem;
}
.content button {
  border: none;
  background-color: var(--red);
  width: 500px;
  height: 50px;
  border-radius: 5px;
  color: white;
  box-shadow: 2px 4px 20px -8px white;
  font-size: 1.25rem;
}
@media only screen and (max-width: 700px) {
  .content button {
    width: 100%;
    font-size: 1rem;
  }
  .imageDiv {
    width: 100%;
  }
}
</style>
