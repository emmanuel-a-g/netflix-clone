<template>
  <div class="formDiv">
    <div>
      <h1>{{ title }}</h1>
    </div>
    <div>
      <ul>
        <li v-for="item in list" :key="item.title"></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "list"],
};
</script>

<style scoped>
.formDiv {
  height: 120vh;
  background-color: black;
}
</style>
