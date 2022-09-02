<template>
  <div class="loginDiv">
    <div class="imageDiv">
      <div class="contentDiv">
        <login-form></login-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/ui/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
};
</script>

<style scoped>
loginDiv {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.imageDiv {
  height: 140vh;
  background: url("~@/assets/netflix_home.jpeg") no-repeat left;
  background-size: cover;
  position: relative;
  text-align: center;
  display: flex;
  justify-content: center;
  /* align-content: center; */
  overflow-y: hidden;
  width: 100%;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.601);
}
.contentDiv {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 12vh;
  /* align-self: flex-start; */
  font-size: 1.5rem;
  z-index: 3;
  max-width: 630px;
}
p {
  color: black;
}
</style>
