import { createRouter, createWebHistory } from "vue-router";

// Import Pages
import Home from "../pages/Home.vue";
import NotFound from "../pages/NotFound.vue";
import About from "../pages/About.vue";
import Posts from "../pages/Posts.vue";
import PostDetails from "../pages/PostDetails.vue";
import Sidebar from "../pages/Sidbar.vue";
import User from "../pages/User.vue";
import UserDetails from "../pages/UserDetails.vue";
import UserProfile from "../pages/UserProfile.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "home",
      // alias: "/home",
    },
    {
      path: "/home",
      redirect: { name: "home" },
    },

    { path: "/about", component: About, name: "about" },
    { path: "/posts", component: Posts, name: "Posts" },
    {
      path: "/posts/:id",
      component: PostDetails,
      // components: { default: PostDetails, sidebar: Sidebar },
      name: "postDetails",
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: "/user",
      component: User,
      name: "User",
    },
    {
      path: "/user/:id",
      component: UserDetails,
      name: "UserDetails",
      children: [
        {
          path: ":profile",
          component: UserProfile,
        },
      ],
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

// router.beforeEach((to, from) => {
//   let isLoggedIn = false;

//   if (!isLoggedIn && to.meta.requiresAuth) {
//     return router.push("/");
//   }
// });

router.beforeEach((to, from, next) => {
  let isLoggedIn = false;

  if (!isLoggedIn && to.meta.requiresAuth) {
    next({ name: "home" });
  } else {
    next();
  }
});
