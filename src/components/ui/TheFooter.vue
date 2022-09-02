<template>
  <div class="loginFooter">
    <div>Questions? Call 1-123-456-789</div>
    <p><span>FAQ</span><span>Cookie Preferences</span></p>
    <p><span>Help Center</span><span>Corporate Information</span></p>
    <p><span>Terms of Use</span></p>
    <p><span>Privacy</span></p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.loginFooter {
  bottom: 0;
  position: absolute;
  z-index: 4;
  height: 30vh;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.555);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.loginFooter p {
  color: var(--greyish);
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 40%;
  text-align: left;
}
.loginFooter span:hover {
  text-decoration: underline;
}
.loginFooter div {
  position: absolute;
  left: 15%;
  top: 15%;
  color: var(--greyish);
}
@media only screen and (max-width: 740px) {
  .loginFooter {
    position: relative;
    border-top: 1px var(--greyish) solid;
  }
  .loginFooter div {
    left: 8%;
  }
}
@media only screen and (max-height: 550px) {
  .loginFooter {
    min-height: 200px;
    position: relative;
    float: none;
  }
  .loginFooter p {
    height: 80%;
  }
}
</style>
