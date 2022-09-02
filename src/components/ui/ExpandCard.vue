<template>
  <div>
    <div class="question" @click="toggle">
      <p>
        {{ question }}
      </p>
      <p v-if="!open" class="plus">+</p>
      <p v-else class="close">-</p>
    </div>
    <div v-if="open" class="answer">
      <p>
        {{ answer }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "question", "answer", "current"],
  emits: ["current-item"],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
      this.$emit("current-item", this.id);
    },
  },
  watch: {
    current(newItem) {
      if (newItem !== this.id && this.open) {
        this.open = false;
      }
    },
  },
};
</script>

<style scoped>
.question {
  background-color: #303030;
  flex: 1;
  height: 80px;
  color: white;
  list-style: none;
  border-bottom: 10px solid black;
  display: flex;
  justify-content: space-between;
}
.question p {
  font-size: 1.5rem;
  padding-left: 30px;
}
.plus {
  padding-right: 30px;
}
.close {
  padding-right: 30px;
}
.answer {
  font-size: 1.2rem;
  padding: 15px;
  background-color: #303030;
  border-bottom: 3px solid black;
}
@media only screen and (max-width: 750px) {
  .question p {
    font-size: 1rem;
  }
}
</style>
