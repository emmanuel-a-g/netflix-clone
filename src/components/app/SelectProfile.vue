<template>
  <div class="wrapper">
    <h1>Who's watching?</h1>
    <div class="profiles">
      <div class="card">
        <img :src="image" alt="user image" />
        <p>Name</p>
      </div>
      <div class="card">
        <img :src="image" alt="user image" />
        <p>Name</p>
      </div>
      <div class="card">
        <img :src="image" alt="user image" />
        <p>Name</p>
      </div>
      <div class="card">
        <img :src="image" alt="user image" />
        <p>Name</p>
      </div>
      <div class="card">
        <img :src="image" alt="user image" />
        <p>Name</p>
      </div>
    </div>
    <button @click="moveTo">Manage Profiles</button>
  </div>
</template>

<script>
import image from "../../assets/logo.png";
export default {
  data() {
    return {
      image,
    };
  },
  methods: {
    moveTo() {
      this.$router.push("/manageprofiles");
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.wrapper h1 {
  font-size: 2.5rem;
}
.profiles {
  width: 80%;
  max-width: 760px;
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-bottom: 30px;
}
button {
  width: 180px;
  height: 35px;
  background-color: transparent;
  border: none;
  color: grey;
  border: 1px solid grey;
}
.card p {
  color: grey;
  text-align: center;
}
.card img {
  width: 50px;
  height: auto;
  border: 1px white solid;
  padding: 5px;
}
@media only screen and (max-width: 700px) {
  .wrapper h1 {
    font-size: 1.5rem;
  }
}
</style>
