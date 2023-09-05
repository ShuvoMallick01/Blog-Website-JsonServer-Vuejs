import { createRouter, createWebHistory } from "vue-router";

// Import Pages
import Home from "../pages/Home.vue";
import NotFound from "../components/NotFound.vue";
import About from "../pages/About.vue";
``;
import Posts from "../pages/Posts.vue";
import PostDetails from "../pages/PostDetails.vue";
import Sidebar from "../pages/Sidbar.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import UserProfile from "../pages/UserProfile.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
    },
    {
      path: "/home",
      redirect: { name: "home" },
    },

    { path: "/login", component: Login, name: "login" },
    { path: "/register", component: Register, name: "register" },
    { path: "/posts", component: Posts, name: "posts" },
    {
      path: "/posts/:id",
      component: PostDetails,
      name: "postDetails",
      props: true,
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});
