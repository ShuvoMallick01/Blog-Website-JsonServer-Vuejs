import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state() {
    return {
      user: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null,
      error: null,
    };
  },

  actions: {
    async userRegistration(data) {
      console.log(data);
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.ok && response.status === 201) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
      } else {
        this.error = await response.json();
      }
    },

    async userLogin(data) {
      console.log(data);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      // if (!response.ok || !response.status === 400)
      //   throw new Error("RESGISTER USER: someting went wrong");

      if (response.ok && response.status === 200) {
        const user = await response.json();
        localStorage.setItem("user", JSON.stringify(user));
        this.user = user;
      } else {
        this.error = await response.json();
      }
    },
  },

  getters: {
    isAuthenticated() {
      return this.user ? true : false;
    },
  },
});
