import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Homepage from "../views/Homepage.vue";
import UpdateProfile from "../views/UpdateProfile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/profile",
    name: "UpdateProfile",
    component: UpdateProfile,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
