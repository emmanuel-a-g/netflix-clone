import { createRouter, createWebHistory } from "vue-router";
import WelcomeView from "../pages/WelcomeView.vue";
import NotFound from "../pages/NotFound.vue";
import LoginView from "../pages/LoginView.vue";
import SignUpHome from "../pages/signup/SignUpHome.vue";
import store from "../store/index";
import { checkAuth } from "../store/index";
//Lazy Loading...
const SignUpOne = () => import("../pages/signup/SignUpOne.vue");
const SignUpTwo = () => import("../pages/signup/SignUpTwo.vue");
const SignUpThree = () => import("../pages/signup/SignUpThree.vue");
const SignUpFour = () => import("../pages/signup/SignUpFour.vue");
const SignUpFive = () => import("../pages/signup/SignUpFive.vue");
const SelectUser = () => import("../pages/SelectUser.vue");
const ManageProfile = () => import("../pages/profile/ManageProfile.vue");
const BrowseView = () => import("../pages/browse/BrowseView.vue");
const AccountView = () => import("../pages/AccountView.vue");
const TheEmail = () => import("../pages/account/TheEmail.vue");
const TheName = () => import("../pages/account/TheName.vue");
const ThePassword = () => import("../pages/account/ThePassword.vue");
const WatchView = () => import("../pages/watch/WatchView.vue");
const ProfileImage = () => import("../pages/profile/ProfileImage.vue");
const MylistView = () => import("../pages/mylist/MylistView.vue");

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: WelcomeView,
      meta: { isHome: true },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/signup",
      meta: { notUser: true },
      component: SignUpHome,
      children: [
        { path: "", component: SignUpOne },
        { path: "two", component: SignUpTwo },
        { path: "three", component: SignUpThree },
        { path: "four", component: SignUpFour },
        { path: "five", component: SignUpFive },
      ],
    },
    {
      path: "/selectuser",
      name: "Select User",
      component: SelectUser,
      meta: { requiresAuth: true },
    },
    {
      path: "/manageprofiles/:profile/:name",
      name: "Manage Profile",
      component: ManageProfile,
      meta: { requiresAuth: true },
    },
    {
      path: "/select",
      name: "Select Profile",
      component: ProfileImage,
    },
    {
      path: "/browse",
      name: "Home",
      component: BrowseView,
      meta: { requiresAuth: true },
    },
    {
      path: "/mylist",
      name: "My List",
      component: MylistView,
      meta: { requiresAuth: true },
    },
    {
      path: "/watch/:videoId",
      name: "Watch",
      component: WatchView,
      meta: { requiresAuth: true },
    },
    {
      path: "/account",
      name: "Account Settings",
      component: AccountView,
      meta: { requiresAuth: true },
    },
    {
      path: "/email",
      component: TheEmail,
      meta: { requiresAuth: true },
    },
    {
      path: "/name",
      component: TheName,
      meta: { requiresAuth: true },
    },
    {
      path: "/password",
      component: ThePassword,
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

router.beforeEach((to, from, next) => {
  //process.env.VUE_TITLE
  if (to.name) {
    document.title = `Netflix Clone - ${to.name}`;
  } else {
    document.title = `Netflix Clone`;
  }

  const loggedIn = store.getters.loggedIn;
  if (to.meta.isHome) {
    checkAuth()
      .then((res) => {
        if (res) {
          next("/browse");
        }
      })
      .catch(() => {
        next();
      });
  } else if (to.meta.requiresAuth && loggedIn) {
    next();
  } else if (to.meta.requiresAuth && !loggedIn) {
    checkAuth()
      .then((res) => {
        if (res) {
          next();
        }
      })
      .catch(() => {
        next("/login");
      });
  } else {
    next();
  }
});

export default router;
