<template>
  <div class="signUpOne">
    <TheFakeNav></TheFakeNav>
    <div class="content">
      <router-view></router-view>
    </div>
    <TheFooter
      position="relative"
      color="#f3f3f3"
      topBorder="lightgrey"
    ></TheFooter>
  </div>
</template>

<script>
import TheFakeNav from "../../components/ui/TheFakeNav.vue";
import TheFooter from "../../components/ui/TheFooter.vue";
export default {
  components: {
    TheFakeNav,
    TheFooter,
  },
};
</script>

<style scoped>
.signUpOne {
  min-height: 100vh;
  background-color: white;
}
.content {
  width: 100%;
  min-height: 47vh;
  display: flex;
  justify-content: center;
}
</style>
