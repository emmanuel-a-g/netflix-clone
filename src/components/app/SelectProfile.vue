<template>
  <div class="wrapper">
    <h1>{{ editMode ? "Manage profiles:" : "Who's watching?" }}</h1>
    <div class="profiles">
      <div
        class="card"
        name="Emmanuel"
        @click="handle(name)"
        :class="{ highlight: editMode, single: !editMode }"
      >
        <img :src="image" alt="user image" />
        <span v-if="editMode"> &#9998; </span>
        <p>Emmanuel</p>
      </div>
      <div
        class="card"
        name="Veronica"
        @click="handle(name)"
        :class="{ highlight: editMode, single: !editMode }"
      >
        <img :src="image" alt="user image" />
        <span v-if="editMode"> &#9998; </span>
        <p>Veronica</p>
      </div>
      <div
        class="card"
        name="Arturo"
        @click="handle(name)"
        :class="{ highlight: editMode, single: !editMode }"
      >
        <img :src="image" alt="user image" />
        <span v-if="editMode"> &#9998; </span>
        <p>Arturo</p>
      </div>
      <div
        class="card"
        name="Michael"
        @click="handle(name)"
        :class="{ highlight: editMode, single: !editMode }"
      >
        <img :src="image" alt="user image" />
        <span v-if="editMode"> &#9998;</span>
        <p>Michael</p>
      </div>
      <div
        class="card"
        name="Wendy"
        @click="handle(name)"
        :class="{ highlight: editMode, single: !editMode }"
      >
        <img :src="image" alt="user image" />
        <span v-if="editMode">&#9998; </span>
        <p>Wendy</p>
      </div>
    </div>
    <button
      :class="{ highlightButton: editMode, single: !editMode }"
      @click="manageToggle"
    >
      {{ editMode ? "Done" : "Manage Profiles" }}
    </button>
  </div>
</template>

<script>
import image from "../../assets/logo.png";
export default {
  props: ["editMode"],
  emits: ["manage", "editUser"],
  data() {
    return {
      image,
      name: "emmanuel",
    };
  },
  methods: {
    manageToggle() {
      this.$emit("manage");
    },
    moveToBrowse() {
      //optional argument of profile??
      //or vue saved;
      this.$router.replace("/browse");
    },
    handle(name) {
      if (this.editMode) {
        this.$emit("editUser", name);
      } else {
        // TO-DO save choosen name in VUEX
        this.$router.push("/browse");
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
.wrapper h1 {
  font-size: 2.5rem;
}
.profiles {
  width: 80%;
  max-width: 760px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 30px;
  min-height: 150px;
}
button {
  width: 180px;
  height: 35px;
  background-color: transparent;
  border: none;
  color: grey;
  border: 1px solid grey;
}
.card {
  min-height: 140px;
  color: grey;
  text-align: center;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1rem;
}
.card:hover {
  color: white;
}
.single:hover {
  border: 1px white solid;
}
.card img {
  width: 50px;
  height: auto;
  padding: 14px;
}
.card span {
  position: absolute;
  color: white;
  height: 0px;
  transform: rotateY(180deg);
}
.highlight {
  border: 1px white solid;
}
.highlightButton {
  border: 1px solid white;
}
@media only screen and (max-width: 700px) {
  .wrapper h1 {
    font-size: 1.5rem;
  }
  .profiles {
    width: 95%;
  }
  .card {
    width: 85px;
    font-size: 0.9rem;
  }
}
</style>
