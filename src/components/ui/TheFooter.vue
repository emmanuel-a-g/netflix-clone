<template>
  <div
    class="loginFooter"
    :style="{
      position: position,
      'background-color': color ? color : 'black',
      'border-top-color': topBorder ? topBorder : 'transparent',
    }"
  >
    <div>Questions? Call 1-123-456-789</div>
    <p><span>FAQ</span><span>Cookie Preferences</span></p>
    <p><span>Help Center</span><span>Corporate Information</span></p>
    <p><span>Terms of Use</span><span class="invis">.</span></p>
    <p><span>Privacy</span><span class="invis">.</span></p>
  </div>
</template>

<script>
export default {
  props: ["position", "color", "topBorder", "bottom", "left"],
};
</script>

<style scoped>
.loginFooter {
  bottom: 0;
  /* Z-INDEX PLACEMENT */
  z-index: 4;
  height: 30vh;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-top-style: solid;
  border-top-width: 0.5px;
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
.invis {
  color: transparent;
}
@media only screen and (max-width: 450px) {
  .loginFooter, .loginFooter p {
    font-size: 10px;
  }
  .loginFooter div {
    left: 5%;
  }
}
@media only screen and (min-width: 740px) {
  .loginFooter {
    position: relative;
    border-top-style: solid;
    border-top-width: 1px;
    font-size: 16px;
  }
  .loginFooter p {
    font-size: 16px;
  }
  .loginFooter div {
    left: 13.5%;
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
