<template>
  <div class="selectUserDiv">
    <img @click="toBrowse" :src="image" alt="netflix logo" />
    <SelectProfile
      @editUser="editThisUser"
      @manage="manageMode"
      :editMode="editMode"
      :profiles="data"
      :profileImages="profileImages"
      @fetchUpdated="fetchNewProfileNames"
    ></SelectProfile>
  </div>
</template>

<script>
import SelectProfile from "../components/app/SelectProfile.vue";
import image from "../assets/netflix.png";
export default {
  components: {
    SelectProfile,
  },
  data() {
    return {
      editMode: false,
      data: {},
      profileImages: { one: 1, two: 1, three: 1, four: 1, five: 1 },
      image,
    };
  },
  methods: {
    toBrowse() {
      this.$router.push("/browse");
    },
    manageMode() {
      this.editMode = !this.editMode;
    },
    editThisUser(name, displayName, imageId = 21, last) {
      if (displayName) {
        this.$router.push({
          path: `/manageprofiles/${name}/${displayName}`,
          query: { id: imageId, last: last },
        });
      } else {
        this.$router.push(`/manageprofiles/${name}/visitor`);
      }
    },
    fetchNewProfileNames() {
      this.$store
        .dispatch("profileNames")
        .then((res) => {
          this.data = res.profiles;
          this.profileImages = res.images;
        })
        .catch((err) => {
          console.log("Profile names error", err);
        });
    },
  },
  mounted() {
    const update = this.$route.query.update;
    if (update) {
      this.fetchNewProfileNames();
    } else {
      const profiles = this.$store.getters.getProfiles;
      const images = this.$store.getters.getProfileImages;
      if (profiles && images) {
        this.data = profiles;
        this.profileImages = images;
      } else {
        this.$store
          .dispatch("profileNames")
          .then((res) => {
            this.data = res.profiles;
            this.profileImages = res.images;
          })
          .catch((err) => {
            console.log("Profile names error", err);
          });
      }
    }
  },
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
  top: 20px;
  left: 5vw;
}
</style>
