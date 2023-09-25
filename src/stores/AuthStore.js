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
  const userRegistration = async (data) => {
    console.log(data);

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok && response.status === 201) {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      userState.user = data;
    } else {
      const error = await response.json();
      throw new Error(error);
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
