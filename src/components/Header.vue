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

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/AuthStore";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

const store = useAuthStore();
const { isAuthenticated } = storeToRefs(store);
const router = useRouter();
const route = useRoute();

// State
const menu = ref([
  { title: "Home", path: "/", private: false },
  { title: "Login", path: "/login", private: false },
  { title: "Register", path: "/register", private: false },
  { title: "My Post", path: "/my-post", private: true },
  { title: "Create Post", path: "/create-post", private: true },
]);

const logout = () => {
  store.hanleLogout();
  return router.push("/login");
};

const active = computed(() => {
  return route.path;
});

// console.log(isAuthenticated.value);

const filterMenu = computed(() => {
  if (isAuthenticated.value) {
    return menu.value.filter((item) => item.private);
  } else {
    return menu.value.filter((item) => !item.private);
  }
});
</script>
