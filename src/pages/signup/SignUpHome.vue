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
  height: 125vh;
}
.content {
  width: 100%;
  height: 87vh;
  display: flex;
  justify-content: center;
}
</style>
