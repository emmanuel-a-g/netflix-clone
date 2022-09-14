<template>
  <div class="wrapper">
    <img class="logo" :src="netflix" alt="netflix logo" />
    <div class="space"></div>
    <div :class="{ openSelection: open, closeSelection: !open }">
      <div class="insideSelection">
        <h2>Change profile icon?</h2>
        <div class="changeImage">
          <div>
            <img :src="getCurrentImage" alt="current profile" />
            <p>Current</p>
          </div>
          <div>
            <p><img id="arrow" :src="rightArr" alt="arrow" /></p>
          </div>
          <div>
            <img :src="getSelectedImage" alt="selected profile" />
            <p>New</p>
          </div>
        </div>
        <div class="buttons">
          <button @click="submitProfile" class="buttonOne">Let's Do It</button>
          <button @click="toggleCancel" class="buttonTwo">Not Yet</button>
        </div>
      </div>
    </div>
    <div class="currentDiv">
      <div class="header">
        <div class="headerLeft">
          <div class="icon">
            <img @click="goBack" :src="leftArr" alt="arrow back" />
          </div>
          <div>
            <h1>Edit Profile</h1>
            <h4>Choose a profile icon.</h4>
          </div>
        </div>
        <div class="headerRight">
          <p>{{ getName }}</p>
          <img :src="getCurrentImage" alt="theImg" />
        </div>
      </div>
      <div class="content" v-if="!open && bigList">
        <div class="train" v-for="(list, index) in bigList" :key="index">
          <div class="wagon" v-for="(prof, idx) in list" :key="idx">
            <div
              class="card"
              :style="{ visibility: prof.id ? 'visible' : 'hidden' }"
            >
              <img
                @click="toggleOpen(prof.id)"
                :src="`${prof.imageUrl ? prof.imageUrl : ''}`"
                alt="profile image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profileImages, getProfileImage } from "../../store/data";
import { divide } from "../../utils/index";
import netflix from "../../assets/netflix.png";
import rightArr from "../../assets/rightArr.png";
import leftArr from "../../assets/leftArr.png";
export default {
  data() {
    return {
      bigList: [],
      open: false,
      selectedImage: "",
      identifier: "",
      profile: "",
      imageId: "",
      netflix,
      rightArr,
      leftArr,
    };
  },
  computed: {
    getCurrentImage() {
      if (!this.imageId) {
        return "";
      } else {
        return getProfileImage(this.imageId).imageUrl;
      }
    },
    getName() {
      if (!this.profile) {
        return "New";
      } else {
        return this.profile;
      }
    },
    getSelectedImage() {
      if (!this.selectedImage) {
        return "";
      } else {
        return getProfileImage(this.selectedImage).imageUrl;
      }
    },
  },
  methods: {
    toggleOpen(id) {
      this.open = true;
      this.selectedImage = id;
      // dispatch update on submit
    },
    goBack() {
      this.$router.back();
    },
    toggleCancel() {
      this.open = false;
      this.selectedImage = "";
    },
    submitProfile() {
      console.log(this.identifier, this.selectedImage);
      this.$store.dispatch("addProfileImageId", {
        profile: this.identifier,
        imageId: this.selectedImage,
      })
      this.$router.back();
    },
  },
  beforeMount() {
    this.bigList = divide(profileImages, 5);
    this.identifier = this.$route.query.profile;
    this.profile = this.$route.query.name;
    this.imageId = +this.$route.query.id;
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
}
.logo {
  position: absolute;
  width: 130px;
  height: auto;
  left: 3vw;
  top: 1vh;
  z-index: 19;
}
.space {
  background-color: transparent;
  height: 12vh;
  width: 100%;
}
.currentDiv {
  width: 85%;
  min-height: 88vh;
  background-color: #141414;
  text-align: center;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  margin-bottom: 15px;
}
.headerLeft {
  color: white;
  display: flex;
  line-height: normal;
  display: flex;
  align-items: center;
}
.card {
  flex: 1;
}
.icon img {
  margin: 0 5px;
  width: 30px;
  height: 30px;
}
.headerLeft h1 {
  padding: 0;
  margin: 0;
  font-size: 2.4rem;
  text-align: left;
}
.headerLeft h4 {
  padding: 0;
  margin: 0;
  font-size: 1.7rem;
  text-align: left;
}
.headerRight {
  display: flex;
  align-items: center;
  font-size: 1rem;
}
.headerRight p {
  font-size: 1.6rem;
  margin-right: 10px;
  color: white;
  font-weight: bold;
}
.headerRight img {
  width: 100px;
  height: auto;
  border-radius: 5px;
}
.content {
  display: flex;
  flex-direction: column;
}
.train {
  display: flex;
  justify-content: space-around;
  border: 1px solid transparent;
}
.wagon {
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wagon img {
  width: 126px;
  height: 126px;
  border-radius: 5px;
  border: 2.5px solid transparent;
}
.wagon img:hover {
  border: 2.5px solid white;
}
.openSelection {
  visibility: visible;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 18;
  background-color: #141414;
  height: 100%;
  color: white;
}
.closeSelection {
  visibility: hidden;
  height: 0;
  width: 0;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 18;
}
.insideSelection {
  text-align: center;
  width: 370px;
}
.changeImage {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 370px;
  height: 245px;
  border-bottom: 0.5px solid rgb(79, 79, 79);
  border-top: 0.5px solid rgb(79, 79, 79);
}
.changeImage p {
  margin: 10px 0;
  font-size: 0.9rem;
}
.changeImage img {
  width: 140px;
  height: 140px;
  border-radius: 5px;
  border: 2.5px solid transparent;
}
.changeImage img:hover {
  border: 2.5px solid white;
}
#arrow {
  width: 26px;
  height: 26px;
  border: 1px solid transparent;
}
#arrow:hover {
  border: 1px solid transparent;
}
.buttons {
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
.buttonOne,
.buttonTwo {
  width: 130px;
  height: 40px;
  border: none;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 5px;
  border: 1px solid transparent;
}
.buttonOne {
  background-color: white;
  color: black;
}
.buttonTwo {
  background-color: transparent;
  color: grey;
  border: 1px solid grey;
}
@media only screen and (max-width: 700px) {
  .wagon img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 1rem;
  }
  .headerRight img {
    width: 60px;
    height: auto;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 550px) {
  .changeImage {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
  .wagon img {
    width: 80px;
    height: 80px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 0.7rem;
  }
}
@media only screen and (max-width: 450px) {
  .changeImage {
    width: 100%;
  }
  .insideSelection {
    width: 100%;
  }
  .wagon img {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    border: 2.5px solid transparent;
  }
  .headerLeft h1,
  .headerLeft h4,
  .headerRight p {
    font-size: 0.5rem;
  }
  .headerRight img {
    width: 60px;
    height: auto;
    border-radius: 5px;
  }
}
@media only screen and (max-width: 350px) {
  .content {
    overflow-x: scroll;
  }
}
</style>
