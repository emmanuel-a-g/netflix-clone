<template>
  <div class="notFound">
    <div>
      <h1>Lost your way?</h1>
      <p>Sorry we can't find that page. Explore our home page instead.</p>
      <router-link class="link" to="/">Home</router-link>
    </div>
  </div>
</template>

<script>
export default {};
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
}
.link {
  text-decoration: none;
  color: var(--red);
}
</style>
