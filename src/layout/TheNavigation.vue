<template>
  <div class="navigationDiv">
    <div class="left">hi</div>
    <div class="right">
      <nav>
        <ul>
          <li>login</li>
          <li>signup</li>
          <li>account</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navigationDiv {
  background-color: rgb(35, 34, 34);
  min-height: 13vh;
  position: relative;
  display: grid;
  grid-template-columns: 30% 70%;
}
.left {
  display: flex;
  justify-content: center;
  align-self: center;
}
nav {
  margin: 0;
  padding: 0;
}
nav ul {
  min-height: 13vh;
  display: flex;
  justify-content: space-evenly;
  margin: 0;
  padding: 0;
  background-color: blueviolet;
}
nav li {
  color: green;
  list-style: none;
  background-color: aqua;
  align-self: center;
  padding: 5px;
}
</style>
