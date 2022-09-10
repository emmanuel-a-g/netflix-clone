<template>
  <TheFakeNav color="black" textColor="white"></TheFakeNav>
  <div class="emailDiv">Change Email</div>
  <TheFooter topBorder="black" color="white" position="relative"></TheFooter>
</template>

<script>
import TheFakeNav from "../../components/ui/TheFakeNav.vue";
import TheFooter from "../../components/ui/TheFooter.vue";
export default {
  components: {
    TheFooter,
    TheFakeNav,
  },
};
</script>

<style scoped>
.emailDiv {
  min-height: 65vh;
}
</style>
