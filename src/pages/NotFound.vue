<template>
  <div class="notFound">
    <div>
      <NetflixLogo></NetflixLogo>
    </div>
    <div>
      <h1>Lost your way?</h1>
      <p>Sorry we can't find that page. Explore our home page instead.</p>
      <router-link class="link" to="/browse">
        <button>Netflix Home</button></router-link
      >
    </div>
  </div>
</template>

<script>
import NetflixLogo from "../components/logo/NetflixLogo.vue";
export default {
  components: {
    NetflixLogo,
  },
};
</script>

<style scoped>
.notFound {
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-size: 1.3rem;
}
.link {
  text-decoration: none;
  color: var(--red);
}
.link button {
  width: 150px;
  height: 45px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1rem;
}
</style>
