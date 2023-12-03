<template>
  <div class="wrapper">
    <h1>{{ editMode ? "Manage profiles:" : "Who's watching?" }}</h1>
    <div class="profiles">
      <div
        v-if="totalProfiles >= 1"
        class="card"
        name="one"
        @click="handleProfile('one')"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="handleGetImage('one')" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ handleGetName("one") }}</p>
      </div>
      <div
        v-if="totalProfiles >= 2"
        class="card"
        name="two"
        @click="handleProfile('two')"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="handleGetImage('two')" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ handleGetName("two") }}</p>
      </div>
      <div
        v-if="totalProfiles >= 3"
        class="card"
        name="three"
        @click="handleProfile('three')"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="handleGetImage('three')" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ handleGetName("three") }}</p>
      </div>
      <div
        v-if="totalProfiles >= 4"
        class="card"
        name="four"
        @click="handleProfile('four')"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="handleGetImage('four')" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ handleGetName("four") }}</p>
      </div>
      <div
        v-if="totalProfiles >= 5"
        class="card"
        name="five"
        @click="handleProfile('five')"
        :class="{ highlight: editMode }"
      >
        <img class="profile" :src="handleGetImage('five')" alt="user image" />
        <span v-if="editMode"
          ><img :src="pencil" alt="edit logo" class="pencil"
        /></span>
        <p>{{ handleGetName("five") }}</p>
      </div>
      <div v-if="totalProfiles <= 4" class="cardSpecial" @click="handleAdd">
        <p class="addCard">
          <img :src="add" alt="add logo" class="add" />
        </p>
      </div>
    </div>
    <button :class="{ highlightButton: editMode }" @click="manageToggle">
      {{ editMode ? "Done" : "Manage Profiles" }}
    </button>
  </div>
</template>

<script>
import pencil from "../../assets/pencil.png";
import add from "../../assets/add.png";
import { getProfileImage } from "../../store/data";
const matcher = { one: 1, two: 2, three: 3, four: 4, five: 5 };
export default {
  props: ["editMode", "profiles", "profileImages"],
  emits: ["manage", "editUser"],
  data() {
    return {
      pencil,
      add,
    };
  },

  computed: {
    totalProfiles() {
      let total = 0;
      for (let key in this.profiles) {
        if (this.profiles[key].length > 1) {
          total++;
        }
      }
      return total;
    },
  },

  methods: {
    handleGetName(identifier) {
      return this.profiles[identifier] || "New";
    },

    handleGetImage(identifier) {
      let id = this.profileImages[identifier];
      return getProfileImage(id).imageUrl;
    },

    manageToggle() {
      this.$emit("manage");
    },

    moveToBrowse() {
      this.$router.replace("/browse");
    },

    handleProfile(name) {
      const displayName = this.handleGetName(name);
      const redirectQuery = (this.$route.query || {}).redirect;
      const imageId = this.profileImages[name];
      const last = this.totalProfiles === matcher[name];
      if (this.editMode) {
        this.$emit("editUser", name, displayName, imageId, last);
      } else {
        this.$store.dispatch("currentIndentifier", name);
        if (redirectQuery === "mylist") {
          this.$router.push("/mylist");
        } else {
          this.$router.push("/browse");
        }
      }
    },

    handleAdd() {
      let matcher = { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five" };
      const profileToAdd = matcher[this.totalProfiles + 1];
      this.$emit("editUser", profileToAdd, "New");
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
  justify-content: center;
  gap: 30px;
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
.addCard {
  margin-top: -14%;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: rgb(141, 140, 140);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
}
.addCard img {
  width: 45px;
  height: 45px;
}
.addCard:hover {
  border: 2px solid white;
}
.card {
  flex: 1;
  min-height: 140px;
  width: 105px;
  max-width: 110px;
  text-align: center;
  color: grey;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.2rem;
}
.card:hover {
  color: white;
}
.cardSpecial {
  flex: 1;
  min-height: 140px;
  width: 105px;
  max-width: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.profile {
  width: 100%;
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
@media only screen and (min-width: 1300px) {
  .profiles {
    width: 100%;
    max-width: 1000px;
    margin-bottom: 30px;
    min-height: 160px;
    gap: 40px;
  }
  .card {
    min-height: 160px;
    width: 125px;
    max-width: 130px;
    font-size: 1.3rem;
  }
  .addCard {
    margin-top: -27%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .addCard img {
    width: 50px;
    height: 50px;
  }
  button {
    width: 190px;
    height: 48px;
    font-size: 1.2em;
  }
}
@media only screen and (max-width: 700px) {
  .wrapper h1 {
    font-size: 1.7rem;
  }
  .profiles {
    width: 93%;
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
  .addCard {
    width: 80px;
    height: 80px;
    margin-top: 0%;
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
    width: 90%;
    flex-wrap: wrap;
  }
  .wrapper h1 {
    font-size: 1.7rem;
  }
}
</style>
