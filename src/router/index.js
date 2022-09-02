import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../pages/WelcomeView.vue";
import NotFound from "../pages/NotFound.vue";
import LoginView from "../pages/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: WelcomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    { path: "/:notFound(.*)", name: "Not Found", component: NotFound },
  ],
});
router.beforeEach((to, _1, next) => {
  //process.env.VUE_TITLE
  document.title = `Netflix Clone - ${to.name}`;
  //dynamic route w/ different posts
  next();
});

export default router;
