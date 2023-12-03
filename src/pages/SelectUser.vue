<template>
  <div class="selectUserDiv">
    <img @click="toBrowse" :src="image" alt="netflix logo" />
    <SelectProfile
      :editMode="editMode"
      :profiles="profiles"
      :profileImages="profileImages"
      @editUser="editThisUser"
      @manage="manageMode"
    ></SelectProfile>
  </div>
</template>

<script>
import SelectProfile from "../components/app/SelectProfile.vue";
import image from "../assets/netflix.png";
import { mapGetters } from "vuex";
export default {
  components: {
    SelectProfile,
  },

  data() {
    return {
      editMode: false,
      image,
    };
  },

  computed: {
    ...mapGetters({
      profiles: "getProfiles",
      profileImages: "getProfileImages",
    }),
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
  },

  mounted() {
    const { update } = (this.$route || {}).query || {};
    if (update) {
      this.$store.dispatch("fetchMyList").catch((err) => {
        console.log("Fetch my list!", err);
      });
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
