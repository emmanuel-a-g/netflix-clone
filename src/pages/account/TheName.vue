<template>
  <div class="mainDiv">
    <TheFakeNav color="black" textColor="white"></TheFakeNav>
    <div class="nameDiv">
      <form>
        <h1>Change Name</h1>
        <div class="inputDiv">
          <p v-if="message" class="message">{{message}}</p>
          <p v-if="error" class="error">{{error}}</p>
          <input
            v-if="name"
            :value="name"
            class="currName"
            type="text"
            readonly
            disabled
          />
          <input
            class="newName"
            type="text"
            maxlength="12"
            :value="newName"
            placeholder="New Name"
            @keyup="setName"
            required
            :disabled="disableSave"
          />
        </div>
        <div class="buttons">
          <button @click.prevent="save" v-if="!disableSave">Save</button>
          <button @click.prevent="cancel" v-if="!disableSave">Cancel</button>
          <button @click.prevent="returnToAccount" v-if="message">Return</button>
        </div>
      </form>
    </div>
    <TheFooter
      topBorder="black"
      color="#f3f3f3"
      position="relative"
    ></TheFooter>
  </div>
</template>

<script>
import TheFakeNav from "../../components/ui/TheFakeNav.vue";
import TheFooter from "../../components/ui/TheFooter.vue";
export default {
  components: {
    TheFooter,
    TheFakeNav,
  },
  data() {
    return {
      name: "",
      newName: "",
      error: "",
      message: "",
      disableSave: false,
    };
  },
  methods: {
    returnToAccount() {
      this.$router.push("account");
    },
    setName(e) {
      this.newName = e.currentTarget.value;
    },
    save() {
      this.message = "";
      this.error = "";
      this.$store
        .dispatch("updateProfileName", { name: this.newName })
        .then(() => {
          this.message = "Success name has been changed."
          this.disableSave = true;
        })
        .catch((err) => {
          this.error = err.code;
          console.log(err);
        });
    },
    cancel() {
      this.$router.push("/account");
    },
  },
  mounted() {
    const name = this.$store.getters.getName;
    if (name) {
      this.name = name;
      this.newName = name;
    }
    if (!name) {
      setTimeout(() => {
        this.name = this.$store.getters.getName;
        this.newName = this.$store.getters.getName;
      }, 1000);
    }
  },
};
</script>

<style scoped>
.buttons {
  margin-top: 30px;
  height: 35px;
}
.buttons button {
  border: none;
  border-radius: 3px;
  padding: 11px;
  width: 100px;
  font-weight: bold;
}
.buttons :nth-child(1) {
  background-color: #0f84fa;
  color: white;
  margin-right: 10px;
}
.buttons :nth-child(2) {
  color: black;
  background-color: #ccc;
}
.mainDiv {
  background-color: #f3f3f3;
}
.nameDiv {
  padding-top: 30px;
  min-height: 65vh;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 240px;
}
.currName {
  font-size: 1rem;
  width: 400px;
  height: 44px;
  border: 1px solid grey;
  border-radius: 3px;
  text-indent: 5px;
  font-size: 1rem;
}
.newName {
  width: 400px;
  height: 44px;
  border: 1px solid grey;
  border-radius: 3px;
  background-color: #e8f0fe;
  text-indent: 5px;
  font-size: 1rem;
}
.inputDiv {
  display: flex;
  flex-direction: column;
  gap: 28px;
}
.inputDiv p {
  font-size: 1.1rem;
  padding: 0;
  margin: 0;
  font-weight: bold;
}
</style>
