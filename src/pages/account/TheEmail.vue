<template>
  <div class="mainDiv">
    <TheFakeNav color="black" textColor="white"></TheFakeNav>
    <div class="emailDiv">
      <form>
        <h1>Change Email</h1>
        <div class="inputDiv">
          <p v-if="message" style="{color: 'green'}">{{message}}</p>
          <p v-if="error" style="{color: 'red'}">{{error}}</p>
          <input
            :value="email"
            class="currEmail"
            type="text"
            readonly
            disabled
          />
          <input
            class="newEmail"
            type="email"
            :value="newEmail"
            placeholder="New Email"
            @keyup="setEmail"
          />
        </div>
        <div class="buttons">
          <button @click.prevent="save">Save</button>
          <button @click.prevent="cancel">Cancel</button>
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
      email: "",
      newEmail: "",
      error: "",
      message: "",
    };
  },
  methods: {
    setEmail(e) {
      this.newEmail = e.currentTarget.value;
    },
    save() {
      this.$store
        .dispatch("updateEmail", { email: this.newEmail })
        .then(() => {
          this.message = "Success email has been changed."
          this.dispatchGoBack();
        })
        .catch((err) => {
          console.log(err);
          let requiresAuth = "auth/requires-recent-login";
          if (err.code === requiresAuth) {
            this.error = "Auth / requires recent login. You will now be re-directed to log in again."
            this.dispatchLogout();
          }
        });
    },
    cancel() {
      this.$router.push("/account");
    },
    dispatchGoBack() {
      setTimeout(() => {
        this.$router.push("/account");
      }, 5000)
    },
    dispatchLogout() {
      setTimeout(() => {
        this.$store.dispatch("logOut");
        window.location.reload();
      }, 5000);
    }
  },
  mounted() {
    const email = this.$store.getters.returnEmail;
    if (email) {
      this.email = email;
      this.newEmail = email;
    }
    if (!email) {
      setTimeout(() => {
        this.email = this.$store.getters.returnEmail;
        this.newEmail = this.$store.getters.returnEmail;
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
.emailDiv {
  padding-top: 30px;
  min-height: 65vh;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 240px;
}
.currEmail {
  font-size: 1rem;
  width: 400px;
  height: 44px;
  border: 1px solid grey;
  border-radius: 3px;
  text-indent: 5px;
  font-size: 1rem;
}
.newEmail {
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
