<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li class="action">alert one</li>
      <li class="action">alert two</li>
      <li class="action">alert three</li>
      <li class="action">alert four</li>
      <li class="action">alert five</li>
      <li class="action">alert six</li>
      <li class="action">alert seven</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["show", "width", "height"],
  methods: {
    handleHover() {
      console.log("I was hovered");
    },
    handleSelectuser() {
      this.$router.push("/selectuser");
    },
  },
};
</script>

<style scoped>
.action {
  text-indent: 20px;
  text-align: left;
}
.theBox ul {
  border: 1px solid rgb(47, 47, 47);
  list-style: none;
  background-color: rgba(0, 0, 0, 0.85);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 440px;
  width: 100%;
  overflow-y: scroll;
}
.theBox li {
  list-style: none;
  margin: 0;
  padding: 5px 0px;
}
.visibleClass {
  position: absolute;
  height: 440px;
  width: 350px;
  top: 8.5vh;
  right: 8.5vw;
  visibility: visible;
  /* transition: 200ms; */
  /* Z-INDEX PLACEMENT */
  z-index: 5;
}
.hiddenClass {
  position: absolute;
  height: 440px;
  width: 350px;
  top: 8.5vh;
  right: 8.5vw;
  background-color: transparent;
  visibility: hidden;
}
@media only screen and (max-width: 800px) {
  .visibleClass {
    right: 9vw;
  }
}
@media only screen and (max-width: 500px) {
  .visibleClass {
    right: 13vw;
    height: 400px;
    width: 300px;
  }
}
</style>
