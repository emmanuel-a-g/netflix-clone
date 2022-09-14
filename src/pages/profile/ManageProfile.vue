<template>
  <div class="wrapper">
    <img class="logo" :src="netflix" alt="netflix logo" />
    <div class="form">
      <div class="cardTitle">
        <h1>Edit Profile</h1>
      </div>
      <div class="cardImg">
        <p @click="profileSelect">
          <img id="imgCard" class="userimg" :src="getImage" alt="user image" />
        </p>
        <p @click="profileSelect" id="editImage">
          <img :src="pencil" alt="edit image" />
        </p>
      </div>
      <div class="cardOne">
        <input
          type="text"
          placeholder="Name"
          ref="name"
          @keyup="setName"
          maxlength="15"
        />
        <p>Language:</p>
        <button>English &#8681;</button>
      </div>
      <div class="cardTwo">
        <p :style="{ padding: '0' }">Maturity Settings:</p>
        <span :style="{ 'font-size': '.8rem' }">MATURE</span>
        <button :style="{ padding: '0' }">Edit</button>
      </div>
      <div class="cardThree">
        <p>Autoplay Controls</p>
        <label>
          <input type="checkbox" />Autoplay next episode on a series of all
          devices.</label
        >
        <label>
          <input type="checkbox" />Autoplay previews while browsing all
          devices.</label
        >
      </div>
    </div>
    <div class="buttons">
      <button @click="saveAndGoBack" :style="{ 'background-color': 'white' }">
        Save
      </button>
      <button @click="cancelAndGoBack">Cancel</button>
    </div>
  </div>
</template>

<script>
import netflix from "../../assets/netflix.png";
import pencil from "../../assets/pencil.png";
import { getProfileImage } from "../../store/data";
export default {
  data() {
    return {
      name: "",
      profile: "",
      nameProvided: false,
      imageId: undefined,
      profileIdentifier: "",
      netflix,
      pencil,
    };
  },
  computed: {
    getImage() {
      const id = +this.$route.query.id;
      if (id) {
        return getProfileImage(id).imageUrl;
      } else {
        return getProfileImage(1).imageUrl;
      }
    },
  },
  methods: {
    profileSelect() {
      const profile = this.$route.params.profile;
      this.$router.push({
        path: "/select",
        query: {
          name: this.profileIdentifier,
          profile: profile,
          id: this.imageId,
        },
      });
    },
    setName() {
      this.name = this.$refs.name.value;
    },
    saveAndGoBack() {
      if (!this.name || this.name.length <= 1) {
        this.cancelAndGoBack();
        return;
      }
      this.$store.dispatch("addNameToProfile", {
        profile: this.profile,
        name: this.name,
      });
      this.$router.push("/selectuser");
    },
    cancelAndGoBack() {
      this.$router.replace("/selectuser");
    },
  },
  beforeMount() {
    this.imageId = +this.$route.query.id;
    this.profileIdentifier = this.$route.params.name;
  },
  mounted() {
    const profile = this.$route.params.profile;
    const name = this.$route.params.name;
    if (profile) {
      this.$refs.name.value = name;
      this.nameProvided = true;
      this.profile = profile;
    } else {
      this.nameProvided = false;
      this.profile = profile;
    }
  },
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  width: 100%;
  font-size: 1rem;
  color: black;
  background-color: #141414;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  min-height: 500px;
  width: 400px;
  max-width: 660px;
  display: grid;
  grid-template-columns: 28% 72%;
  grid-template-rows: 15% 28% 28% 28%;
  color: white;
}
.logo {
  position: absolute !important;
  width: 130px;
  height: auto;
  left: 3vw;
  top: 1vh;
}
.cardTitle h1 {
  font-size: 2rem;
  color: white;
}
.buttons {
  width: 400px;
  padding-top: 30px;
  border-top: 0.25px grey solid;
  display: flex;
  justify-content: flex-start;
}
button {
  width: 80px;
  height: 35px;
  background-color: transparent;
  border: none;
  color: grey;
  border: 1px solid grey;
  margin-right: 25px;
}
.cardTitle {
  grid-row: 1 / span 1;
  grid-column: 1 / span 4;
  border-bottom: 0.25px grey solid;
}
.cardImg {
  grid-row: 2 / span 1;
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
}
.cardOne {
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.cardOne input {
  width: 95%;
  padding: 0;
  height: 35px;
  background-color: rgb(98, 98, 98);
  border: none;
  color: white;
  font-size: 16px;
  text-indent: 10px;
}
.cardOne input::placeholder {
  color: rgb(175, 175, 175);
}
.cardTwo {
  border-top: 0.25px grey solid;
  grid-row: 3 / span 1;
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.cardThree {
  font-size: 0.75rem;
  border-top: 0.25px grey solid;
  grid-row: 4 / span 1;
  grid-column: 2 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.cardImg p {
  margin: 3px 0 0 0;
  padding: 0;
}
#imgCard {
  width: 98px;
  height: auto;
  border-radius: 5px;
  padding: 0;
  margin: 0;
}
#editImage {
  position: absolute;
  top: 48%;
  left: 10%;
  border-radius: 50%;
  height: 30px;
  width: 30px;
  background-color: rgba(0, 0, 0, 0.474);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
#editImage img {
  height: 20px;
  width: 20px;
}
@media only screen and (max-width: 700px) {
  .wrapper h1 {
    font-size: 1.5rem;
  }
  .form {
    min-width: none;
    max-width: none;
    width: 100%;
  }
}
</style>
