<template>
  <div class="theBox" :class="{ visibleClass: show, hiddenClass: !show }">
    <ul>
      <li class="action">New Arrival Diary of Gigolo</li>
      <li class="action">New Arrival Buy My House</li>
      <li class="action">What's Leaving Last Chance</li>
      <li class="action">Last: Don't Blame Karma</li>
      <li class="action">New Arrival Gray Man</li>
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
.action:hover {
  background-color: rgba(0, 0, 0, 0.941);
}
.theBox ul {
  border: 1px solid rgb(47, 47, 47);
  border-top: 2px solid white;
  list-style: none;
  background-color: rgba(0, 0, 0, 0.85);
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-height: 350px;
  width: 100%;
}
.theBox li {
  list-style: none;
  margin: 0;
  padding: 5px 0px;
  flex: 1;
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
  .visibleClass,
  .hiddenClass {
    right: 13vw;
    height: 250px;
    width: 250px;
  }
}
</style>
