<template>
  <div class="formDiv">
    <div class="innerDiv">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div class="listDiv">
        <expand-card
          class="item"
          v-for="item in data"
          :key="item.id"
          :id="item.id"
          :question="item.question"
          :answer="item.answer"
          :current="current"
          @current-item="currentItem"
        >
        </expand-card>
      </div>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <EmailForm class="email" @submit-email="submitEmail"></EmailForm>
    </div>
  </div>
</template>

<script>
import ExpandCard from "../components/ui/ExpandCard.vue";
import EmailForm from "../components/ui/EmailForm.vue";
export default {
  props: ["title", "data"],
  components: {
    ExpandCard,
    EmailForm,
  },
  data() {
    return {
      current: null,
    };
  },
  methods: {
    currentItem(val) {
      this.current = val;
    },
    submitEmail(email) {
      alert("questions comp email: " + email);
    },
  },
  //IMPLEMENT FUNCTIONALITY TO CLOSE ALL OTHERS...
};
</script>

<style scoped>
.formDiv {
  min-height: 120vh;
  background-color: black;
  display: flex;
  justify-content: center;
}
.innerDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 90%;
}
.email {
  width: 55%;
}
.innerDiv p {
  font-size: 1.2rem;
}
.formDiv h1 {
  margin-top: 45px;
  font-size: 2.75rem;
}
.listDiv {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 60%;
  min-height: 55%;
}
</style>
