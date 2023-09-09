<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="container flex items-center justify-between py-4 mx-auto px-3">
      <router-link to="/" class="flex items-center">
        <span
          class="self-center text-xl text-gray-400 font-semibold whitespace-nowrap"
          >VUE-BLOG</span
        >
      </router-link>

      <div class="">
        <ul class="font-medium flex text-gray-400 gap-5 md:gap-7 uppercase">
          <li
            v-for="menuItem in filterMenu"
            :key="menuItem"
            :class="{ 'text-slate-300': menuItem.path === active }"
          >
            <router-link
              :to="menuItem.path"
              class="hover:text-slate-300 duration-300"
              >{{ menuItem.title }}</router-link
            >
          </li>

          <li v-if="isAuthenticated">
            <button @click="logout()" class="hover:text-slate-300 duration-300">
              LOGOUT
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import { useAuthStore } from "../store/auth";
export default {
  data() {
    return {
      menu: [
        { title: "Home", path: "/", private: false },
        { title: "Login", path: "/login", private: false },
        { title: "Register", path: "/register", private: false },
        { title: "My Post", path: "/my-post", private: true },
        { title: "Create Post", path: "/create-post", private: true },
      ],
    };
  },

  methods: {
    logout() {
      this.hanleLogout();
      return this.$router.push("/login");
    },

    ...mapActions(useAuthStore, ["hanleLogout"]),
  },

  computed: {
    active() {
      return this.$route.path;
    },

    filterMenu() {
      let menu = [];

      if (this.isAuthenticated) {
        menu = this.menu.filter((item) => item.private);
      } else {
        menu = this.menu.filter((item) => !item.private);
      }

      return menu;
    },

    ...mapState(useAuthStore, ["isAuthenticated"]),
  },
};
</script>
