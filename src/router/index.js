import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../pages/WelcomeView.vue";
import NotFound from "../pages/NotFound.vue";
import LoginView from "../pages/LoginView.vue";
import SignUpHome from "../pages/signup/SignUpHome.vue";
// lazy loading...
const SignUpOne = () => import("../pages/signup/SignUpOne.vue");
const SignUpTwo = () => import("../pages/signup/SignUpTwo.vue");

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
    {
      path: "/signup",
      component: SignUpHome,
      children: [
        { path: "", component: SignUpOne },
        {
          path: "two",
          component: SignUpTwo,
        },
      ],
    },
    { path: "/:notFound(.*)", name: "Not Found", component: NotFound },
  ],
});
router.beforeEach((to, _1, next) => {
  //process.env.VUE_TITLE
  if (to.name) {
    document.title = `Netflix Clone - ${to.name}`;
  } else {
    document.title = `Netflix Clone`;
  }
  //dynamic route w/ different posts
  next();
});

export default router;
