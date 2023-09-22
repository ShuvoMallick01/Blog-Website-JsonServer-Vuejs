import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  // State
  let user = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  let error = ref(null);

  // Methods
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
      user.value = data;
    } else {
      error.value = await response.json();
    }
  };

  const userLogin = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok && response.status === 200) {
      const user = await response.json();
      localStorage.setItem("user", JSON.stringify(user));

      user.value = user;
    } else {
      error.value = await response.json();
    }
  };

  const hanleLogout = () => {
    localStorage.removeItem("user");
    user.value = null;
    return;
  };

  const isAuthenticated = computed(() => {
    return user.value ? true : false;
  });

  console.log(user.value);

  return {
    user,
    useAuthStore,
    userRegistration,
    isAuthenticated,
    hanleLogout,
    userLogin,
  };
});
