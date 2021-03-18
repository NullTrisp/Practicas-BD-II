import Vue from "vue";
import VueRouter from "vue-router";
import LandingPage from "../views/LandingPage.vue";
import Homepage from "../views/Homepage.vue";
import UpdateProfile from "../views/UpdateProfile.vue";
import FollowUsers from "../views/FollowUsers.vue";
import UsersFollowed from "../views/UsersFollowed.vue";
import AdminDashboard from "../views/AdminDashboard.vue";

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
  {
    path: "/follow",
    name: "FollowUsers",
    component: FollowUsers,
  },
  {
    path: "/followed",
    name: "UsersFollowed",
    component: UsersFollowed,
  },
  {
    path: "/admin",
    name: "AdminDashboard",
    component: AdminDashboard,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
