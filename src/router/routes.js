import { createRouter, createWebHistory } from "vue-router";

// Import Pages
import Home from "../pages/Home.vue";
import NotFound from "../components/NotFound.vue";
import CreatePost from "../pages/CreatePost.vue";
import MyPosts from "../pages/MyPosts.vue";
import PostDetails from "../pages/PostDetails.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import { useAuthStore } from "../store/auth";

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

    {
      path: "/login",
      component: Login,
      name: "login",
      meta: { guest: true },
    },
    {
      path: "/register",
      component: Register,
      name: "register",
      meta: { guest: true },
    },
    {
      path: "/posts/:id",
      component: PostDetails,
      name: "postDetails",
    },
    {
      path: "/myposts",
      component: MyPosts,
      name: "myposts",
      meta: { requireAuth: true },
    },
    {
      path: "/createpost",
      component: CreatePost,
      name: "createpost",
      meta: { requireAuth: true },
    },

    { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
  ],
});

router.beforeEach((to, form) => {
  const { isAuthenticated } = useAuthStore();

  if (to.meta.requireAuth && !isAuthenticated) return "/login";
  else if (to.meta.guest && isAuthenticated) return "/";
});
