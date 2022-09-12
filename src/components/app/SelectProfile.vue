<template>
  <div class="wrapper">
    <h1>{{ editMode ? "Manage profiles:" : "Who's watching?" }}</h1>
    <div class="profiles">
      <div
        class="card"
        name="one"
        @click="handle('one', nameOne)"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="imageOne" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ nameOne }}</p>
      </div>
      <div
        class="card"
        name="two"
        @click="handle('two', nameTwo)"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="imageTwo" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ nameTwo }}</p>
      </div>
      <div
        class="card"
        name="three"
        @click="handle('three', nameThree)"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="imageThree" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ nameThree }}</p>
      </div>
      <div
        class="card"
        name="four"
        @click="handle('four', nameFour)"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="imageFour" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ nameFour }}</p>
      </div>
      <div
        class="card"
        name="five"
        @click="handle('five', nameFive)"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="imageFive" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ nameFive }}</p>
      </div>
    </div>
    <button :class="{ highlightButton: editMode }" @click="manageToggle">
      {{ editMode ? "Done" : "Manage Profiles" }}
    </button>
  </div>
</template>

<script>
import pencil from "../../assets/pencil.png";
export default {
  props: [
    "editMode",
    "profileOne",
    "profileTwo",
    "profileThree",
    "profileFour",
    "profileFive",
  ],
  emits: ["manage", "editUser"],
  data() {
    return {
      pencil,
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
    };
  },
  computed: {
    nameOne() {
      return this.profileOne || "New";
    },
    nameTwo() {
      return this.profileTwo || "New";
    },
    nameThree() {
      return this.profileThree || "New";
    },
    nameFour() {
      return this.profileFour || "New";
    },
    nameFive() {
      return this.profileFive || "New";
    },
    imageOne() {
      return "https://res.cloudinary.com/milito/image/upload/v1662997890/netflix/maskProfile_xx1z4x.png";
    },
    imageTwo() {
      return "https://res.cloudinary.com/milito/image/upload/v1662997890/netflix/tokyoProfile_q2bukk.png";
    },
    imageThree() {
      return "https://res.cloudinary.com/milito/image/upload/v1662997890/netflix/maskProfile_xx1z4x.png";
    },
    imageFour() {
      return "https://res.cloudinary.com/milito/image/upload/v1662997890/netflix/tokyoProfile_q2bukk.png";
    },
    imageFive() {
      return "https://res.cloudinary.com/milito/image/upload/v1662997890/netflix/maskProfile_xx1z4x.png";
    },
  },
  methods: {
    manageToggle() {
      this.$emit("manage");
    },
    moveToBrowse() {
      this.$router.replace("/browse");
    },
    handle(name, displayName) {
      if (this.editMode) {
        this.$emit("editUser", name, displayName);
      } else {
        this.$store.dispatch("currentProfile", displayName);
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
}
.wrapper h1 {
  font-size: 3rem;
}
.profiles {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  min-height: 160px;
}
button {
  width: 180px;
  height: 38px;
  background-color: transparent;
  border: none;
  color: grey;
  border: 1px solid grey;
  font-size: 1rem;
}
button:hover {
  border: 1px solid white;
  color: white;
}
.card {
  flex: 1;
  min-height: 140px;
  color: grey;
  text-align: center;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.2rem;
}
.card:hover {
  color: white;
}
.profile {
  width: 120px;
  height: auto;
  border-radius: 5px;
  /* life saver prevents border movement */
  border: 1px solid transparent;
}
.profile:hover {
  border: 1px solid white;
}
.card span {
  position: relative;
}
.pencil {
  top: -70px;
  left: -15px;
  position: absolute;
  width: 30px;
  height: 30px;
}
.highlightButton {
  background-color: white;
  border: none;
  color: black;
  font-weight: bold;
}
.highlightButton:hover {
  border: none;
  background-color: #cc0000;
  color: white;
}
@media only screen and (max-width: 700px) {
  .wrapper h1 {
    font-size: 1.7rem;
  }
  .profiles {
    width: 95%;
  }
  .card {
    width: 85px;
    font-size: 0.9rem;
  }
  .profile {
    width: 80px;
    height: auto;
    border-radius: 5px;
    border: 1px solid transparent;
  }
  button {
    font-size: 0.9rem;
    width: 150px;
    height: 38px;
    text-align: center;
  }
}
</style>
