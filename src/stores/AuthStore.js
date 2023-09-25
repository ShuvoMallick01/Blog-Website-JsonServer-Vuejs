import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
import axios from "../utilities/axios";

export const useAuthStore = defineStore("authStore", () => {
  // State
  let userState = reactive({
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  });
  let error = ref(null);

  // Methods
  // REGISTER
  const userRegistration = async (payload) => {
    const { data } = await axios().post("/register", payload);
    console.log(data);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      userState.user = data;
    } else {
      return data;
    }
  };

  // LOGIN
  const userLogin = async (payload) => {
    const { data } = await axios().post("/login", payload);

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      userState.user = data;
      // return data;
    } else {
      return data;
    }
  };

  // LOGOUT
  const hanleLogout = () => {
    localStorage.removeItem("user");
    userState.user = null;
    return;
  };

  // AUTHENTICATED
  const isAuthenticated = computed(() => {
    return userState.user ? true : false;
  });

  return {
    userState,
    useAuthStore,
    userRegistration,
    isAuthenticated,
    hanleLogout,
    userLogin,
  };
});
