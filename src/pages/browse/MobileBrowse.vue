<template>
  <div
    class="theBox"
    :class="{ visibleClass: show, hiddenClass: !show }"
    @mouseleave="close"
  >
    <ul>
      <li
        class="realAction"
        @click="moveTo('browse')"
        :style="{ 'font-weight': path === 'home' ? 'bold' : 'normal' }"
      >
        Home
      </li>
      <li class="realAction" @click="moveTo('mylist')">My List</li>
      <li class="action">TV Shows</li>
      <li class="action">Movies</li>
      <li class="action">New & Popular</li>
      <li class="action">Browse by Languages</li>
    </ul>
  </div>
</template>

<script>
// SET FALSE CLASS AS DEFAULT
export default {
  emits: ["handleClose"],
  props: ["show"],
  data() {
    return {
      path: "",
    };
  },
  methods: {
    close() {
      this.$emit("handleClose");
    },
    moveTo(to) {
      this.$router.push(`/${to}`);
    },
  },
  mounted() {
    const path = this.$route.path;
    if (path.includes("browse")) {
      this.path = "home";
    } else {
      this.path = "mylist";
    }
  },
};
</script>

<style scoped>
.action {
  text-indent: 20px;
  text-align: left;
}
.realAction {
  text-indent: 20px;
  text-align: left;
}
.realAction:hover {
  cursor: pointer;
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
li:hover {
  background-color: rgba(0, 0, 0, 0.87);
}
.visibleClass {
  position: absolute;
  height: 350px;
  width: 250px;
  top: 8vh;
  left: 8.5vw;
  visibility: visible;
  /* transition: 200ms; */
  /* Z-INDEX PLACEMENT */
  z-index: 5;
}
.hiddenClass {
  position: absolute;
  height: 250px;
  width: 250px;
  top: 8vh;
  left: 8.5vw;
  background-color: transparent;
  visibility: hidden;
}
@media only screen and (max-width: 800px) {
  .visibleClass {
    left: 9vw;
  }
}
@media only screen and (max-width: 500px) {
  .visibleClass,
  .hiddenClass {
    left: 2vw;
    height: 250px;
    width: 250px;
  }
}
</style>
