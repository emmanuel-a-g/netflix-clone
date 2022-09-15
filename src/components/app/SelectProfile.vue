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
import { getProfileImage } from "../../store/data";
export default {
  props: ["editMode", "profiles", "profileImages"],
  emits: ["manage", "editUser"],
  data() {
    return {
      pencil,
    };
  },
  computed: {
    nameOne() {
      return this.profiles["one"] || "New";
    },
    nameTwo() {
      return this.profiles["two"] || "New";
    },
    nameThree() {
      return this.profiles["three"] || "New";
    },
    nameFour() {
      return this.profiles["four"] || "New";
    },
    nameFive() {
      return this.profiles["five"] || "New";
    },
    imageOne() {
      let id = this.profileImages["one"];
      return getProfileImage(id).imageUrl;
    },
    imageTwo() {
      let id = this.profileImages["two"];
      return getProfileImage(id).imageUrl;
    },
    imageThree() {
      let id = this.profileImages["three"];
      return getProfileImage(id).imageUrl;
    },
    imageFour() {
      let id = this.profileImages["four"];
      return getProfileImage(id).imageUrl;
    },
    imageFive() {
      let id = this.profileImages["five"];
      return getProfileImage(id).imageUrl;
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
      //check for redirect query?
      const redirectQuery = this.$route.query.redirect;
      const imageId = this.profileImages[name];
      if (this.editMode) {
        this.$emit("editUser", name, displayName, imageId);
      } else {
        this.$store.dispatch("currentProfile", { name, displayName });
        if (redirectQuery === "mylist") {
          this.$router.push("/mylist");
        } else {
          this.$router.push("/browse");
        }
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
  border: 2px solid transparent;
}
.profile:hover {
  border: 2px solid white;
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
  width: 120px;
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
    width: 92%;
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
@media only screen and (max-width: 500px) {
  .profiles {
    width: 100%;
    flex-wrap: wrap;
  }
  .wrapper h1 {
    font-size: 1.7rem;
  }
}
</style>
