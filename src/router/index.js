import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../pages/WelcomeView.vue";
import NotFound from "../pages/NotFound.vue";
import LoginView from "../pages/LoginView.vue";
import SignUpHome from "../pages/signup/SignUpHome.vue";
import store from "../store/index";
// lazy loading...
const SignUpOne = () => import("../pages/signup/SignUpOne.vue");
const SignUpTwo = () => import("../pages/signup/SignUpTwo.vue");
const SignUpThree = () => import("../pages/signup/SignUpThree.vue");
const SignUpFour = () => import("../pages/signup/SignUpFour.vue");
const SignUpFive = () => import("../pages/signup/SignUpFive.vue");
const SelectUser = () => import("../pages/SelectUser.vue");
const ManageProfile = () => import("../pages/profile/ManageProfile.vue");
const BrowseView = () => import("../pages/browse/BrowseView.vue");
const AccountView = () => import("../pages/AccountView.vue");

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
        { path: "three", component: SignUpThree },
        { path: "four", component: SignUpFour },
        { path: "five", component: SignUpFive },
      ],
    },
    {
      path: "/selectuser",
      component: SelectUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/manageprofiles/:name",
      component: ManageProfile,
      meta: { requiresAuth: true },
    },
    {
      path: "/browse",
      component: BrowseView,
      meta: { requiresAuth: true },
    },
    {
      path: "/account",
      component: AccountView,
      meta: { requiresAuth: true },
    },
    { path: "/:notFound(.*)", name: "Not Found", component: NotFound },
  ],
  scrollBehavior(_1, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, _1, next) => {
  //process.env.VUE_TITLE
  if (to.name) {
    document.title = `Netflix Clone - ${to.name}`;
  } else {
    document.title = `Netflix Clone`;
  }
  //dynamic route w/ different posts
  if (to.meta.requiresAuth && store.getters.loggedIn) {
    next();
  } else if (to.meta.requiresAuth && !store.getters.loggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
