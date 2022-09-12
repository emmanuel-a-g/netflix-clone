<template>
  <div class="selectUserDiv">
    <img :src="image" alt="netflix logo" />
    <SelectProfile
      @edit-user="editThisUser"
      @manage="manageMode"
      :editMode="editMode"
      :profileOne="data['one']"
      :profileTwo="data['two']"
      :profileThree="data['three']"
      :profileFour="data['four']"
      :profileFive="data['five']"
    ></SelectProfile>
  </div>
</template>

<script>
import SelectProfile from "../components/app/SelectProfile.vue";
import { onUpdateProfiles } from "../store/index";
import image from "../assets/netflix.png";
export default {
  components: {
    SelectProfile,
  },
  data() {
    return {
      editMode: false,
      image,
      data: {
        one: "",
        two: "",
        three: "",
        four: "",
        five: "",
      },
    };
  },
  methods: {
    manageMode() {
      this.editMode = !this.editMode;
    },
    editThisUser(name, displayName) {
      if (displayName) {
        this.$router.push(`/manageprofiles/${name}/${displayName}`);
      } else {
        this.$router.push(`/manageprofiles/${name}/undefined`);
      }
    },
  },
  mounted() {
    const profiles = this.$store.getters.getProfiles;
    if (profiles) {
      this.data = profiles;
    } else {
      this.$store
        .dispatch("profileNames")
        .then((res) => {
          this.data = res.profiles;
        })
        .catch((err) => {
          console.log("Profile names error", err);
        });
    }
  },
  updated() {
    onUpdateProfiles()
    .then((res) => {
      this.data = res;
    })
    .catch((err) => {
      console.log("On update profile name error",err);
    })
  }
};
</script>

<style scoped>
.selectUserDiv {
  min-height: 100vh;
  display: relative;
  /* special color */
  background-color: #141414;
}
.selectUserDiv img {
  width: 100px;
  height: auto;
  position: absolute;
  left: 1vw;
}
</style>
